import { useRef, useEffect, useState } from "react";
import { WebSocketSubject, webSocket } from "rxjs/webSocket";
import { Subject, interval } from "rxjs";
import { tap, throttle, takeUntil } from "rxjs/operators";
import { getWatchList, saveWatchList } from "../utils/storageManager";
import { WatchlistType } from "../types/WatchlistType";

const useSocket = () => {
  const [watchList, setWatchList] = useState<string[]>(getWatchList() || []);
  const [streams, setStreams] = useState<{ [key: string]: WatchlistType }>({});
  const wsSubject = useRef<WebSocketSubject<any> | null>(null);
  const destroy$ = useRef(new Subject<void>());
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  useEffect(() => {
    wsSubject.current = webSocket({
      url: (process.env.VITE_SOCKET_URL as string) || "ws://localhost:8425/",
      openObserver: {
        next: () => {
          console.log("WebSocket Connected");
          watchList.forEach((isin) =>
            wsSubject.current?.next({ subscribe: isin })
          );
        },
      },
      closeObserver: {
        next: () => {
          console.log("WebSocket Disconnected");
        },
      },
    });

    const messages$ = wsSubject.current.pipe(
      takeUntil(destroy$.current),
      // throttle(() => interval(process.env.VITE_FETCH_INTERVAL as unknown as number )),
      tap({
        next: (data) => {
          setStreams((prevStreams) => {
            const prevData = prevStreams[data.isin] || {};
            const prevPrice = prevData.price || data.price;
            const percentChange = ((data.price - prevPrice) / prevPrice) * 100;
            const percentChangeFlag =
              percentChange > 0 ? "UP" : percentChange < 0 ? "DOWN" : "EQUAL";
            return {
              ...prevStreams,
              [data.isin]: { ...data, percentChange, percentChangeFlag },
            };
          });
          setLastUpdated(new Date());
        },
        error: (error) => console.error("WebSocket Error:", error),
      })
    );

    messages$.subscribe();

    return () => {
      destroy$.current.next();
      wsSubject.current?.complete();
      wsSubject.current = null;
    };
  }, [watchList]);

  const subscribe = (isin: string) => {
    if (!watchList.includes(isin)) {
      setWatchList((prevList) => [...prevList, isin]);
      wsSubject.current?.next({ subscribe: isin });
    }
  };

  const unsubscribe = (isin: string) => {
    const updatedWatchList = watchList.filter((item) => item !== isin);
    setWatchList(updatedWatchList);
    setStreams((prevStreams) => {
      const newStreams = { ...prevStreams };
      delete newStreams[isin];
      return newStreams;
    });
    wsSubject.current?.next({ unsubscribe: isin });
    saveWatchList(updatedWatchList);
  };

  const streamListCount = Object.keys(streams).length;

  return { streams, subscribe, unsubscribe, streamListCount, lastUpdated };
};

export default useSocket;
