jest.mock("../hooks/useSocket", () => ({
  useSocket: jest.fn(() => ({
    streams: {
      DE000BASF111: {
        isin: "DE000BASF111",
        price: 100,
        bid: 99,
        ask: 101,
        percentChange: 1,
        percentChangeFlag: "UP",
      },
    },
    unsubscribe: jest.fn(),
    streamListCount: 1,
    lastUpdated: "April 22, 2024 00:00:00",
  })),
}));
