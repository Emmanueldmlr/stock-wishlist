export const validateIsin = (isin: string, watchList: string[]) => {
  if (!isin) {
    return {
      error: "ISIN is required",
      isValid: false,
    };
  }
  if (watchList.includes(isin)) {
    return {
      error: "ISIN already exists in the watchlist",
      isValid: false,
    };
  }
  if (isin.length !== 12 || !isin.match(/^[A-Z0-9]+$/i)) {
    return {
      error: "Invalid ISIN",
      isValid: false,
    };
  }
  return {
    error: "",
    isValid: true,
  };
};
