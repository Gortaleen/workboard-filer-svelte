export function formatAsMoney(
  num: number,
  locale = "en-US",
  currency = "USD"
): string {
  return num.toLocaleString(locale, {
    style: "currency",
    currency: currency,
    notation: "compact",
  });
}

export function dollarsToNumber(dollarStr: string): number {
  return Number(dollarStr.replace(/[^0-9.-]+/g, ""));
}
