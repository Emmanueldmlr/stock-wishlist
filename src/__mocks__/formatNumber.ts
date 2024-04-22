jest.mock("../utils/numberHandler", () => ({
  formatNumber: (num: number) => num.toFixed(2),
}));
