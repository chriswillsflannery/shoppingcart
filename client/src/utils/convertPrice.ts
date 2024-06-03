export function convertPrice(price: number | undefined) {
  if (price === undefined) return "";
  const decimalPrice = price / 100;
  const formattedPrice = price === 0 ? "0" : decimalPrice.toFixed(2);
  return formattedPrice;
}