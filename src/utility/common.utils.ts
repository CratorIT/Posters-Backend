

export const generateSKU = (lastFive, type) => {
  const date = new Date();
  const year = date.getFullYear();
  const lastTwoDigit = String(year).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const newNumber = (Number(lastFive) + 1).toString().padStart(5, '0');
  const sku = `${type}${lastTwoDigit}${month}${newNumber}`;

  return sku;
};
