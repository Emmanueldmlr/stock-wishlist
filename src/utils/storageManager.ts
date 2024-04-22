export const saveWatchList = (watchList: string[]) => {
  localStorage.setItem(
    process.env.VITE_WATCH_LIST_KEY || "WATCH_LIST_KEY",
    JSON.stringify(watchList)
  );
}

export const getWatchList = () => {
  const watchList = localStorage.getItem(
    process.env.VITE_WATCH_LIST_KEY || "WATCH_LIST_KEY"
  );
  return watchList ? JSON.parse(watchList) : [];
}