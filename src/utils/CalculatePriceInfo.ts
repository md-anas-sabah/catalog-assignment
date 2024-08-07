/* eslint-disable @typescript-eslint/no-explicit-any */
export const calculatePriceInfo = (data: any[]) => {
  const currentPrice = data[data.length - 1].price;
  const previousPrice = data[data.length - 2].price;
  const change = currentPrice - previousPrice;
  const changePercentage = (change / previousPrice) * 100;

  return {
    currentPrice: currentPrice.toFixed(2),
    change: change.toFixed(2),
    changePercentage: changePercentage.toFixed(2),
  };
};
