export interface WatchlistType {
  isin: string;
  bid: number;
  ask: number;
  price: number;
  percentChange: number;
  percentChangeFlag: "UP" | "DOWN" | "EQUAL" | string;
}
