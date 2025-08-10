const usdToIdr = (amount: number): number => {
  const exchangeRate = 15100;
  return Math.round(amount * exchangeRate);
};

export default usdToIdr;
