export function convertPrice(price: number) {
  const decimalPrice = price / 100;
  return price === 0 ? "0" : parseFloat(decimalPrice.toFixed(2)).toString();
}