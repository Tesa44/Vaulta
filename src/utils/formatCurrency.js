export function formatCurrency(amount, currency = "PLN") {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency,
  }).format(amount);
}
