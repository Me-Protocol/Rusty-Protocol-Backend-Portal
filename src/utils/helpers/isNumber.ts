export function isNumber(n: any) {
  n.replace(/\D/g, "");
  return !isNaN(parseFloat(n)) && isFinite(n);
}
