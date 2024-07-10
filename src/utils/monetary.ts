export function convertNumberToBRL(amount: number) {
  return amount.toLocaleString("pt-br", { style: "currency", currency: "BRL"});
}