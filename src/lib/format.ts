/**
 * Number formatting for amounts.
 *
 * Amounts are always rendered LTR inside the RTL layout (see <Amount />), so
 * the output here is plain LTR text: "₪1,234", "-₪89.90", "+₪12,000".
 * Intl's he-IL currency format adds bidi marks and puts ₪ after the number,
 * which breaks inside an LTR island, so we format the number with he-IL and
 * place the symbol ourselves.
 */

const BIDI_MARKS = /[\u200e\u200f\u061c\u202a-\u202e\u2066-\u2069]/g;

const formatters = new Map<string, Intl.NumberFormat>();

function numberFormat(minFraction: number, maxFraction: number) {
  const key = `${minFraction}-${maxFraction}`;
  let f = formatters.get(key);
  if (!f) {
    f = new Intl.NumberFormat("he-IL", {
      minimumFractionDigits: minFraction,
      maximumFractionDigits: maxFraction,
    });
    formatters.set(key, f);
  }
  return f;
}

export type FormatILSOptions = {
  /** "auto": minus only. "always": + or -. "never": absolute value. */
  sign?: "auto" | "always" | "never";
  /** Show agorot. "auto" shows them only when the amount isn't whole. */
  decimals?: "auto" | "always" | "never";
};

export function formatILS(value: number, { sign = "auto", decimals = "auto" }: FormatILSOptions = {}) {
  const abs = Math.abs(value);
  const hasFraction = Math.round(abs * 100) % 100 !== 0;
  const showDecimals = decimals === "always" || (decimals === "auto" && hasFraction);
  const digits = showDecimals ? 2 : 0;
  const number = numberFormat(digits, digits).format(abs).replace(BIDI_MARKS, "");

  // Avoid "-₪0" after rounding
  const isZero = Number(abs.toFixed(digits)) === 0;
  let prefix = "";
  if (!isZero && sign !== "never") {
    if (value < 0) prefix = "-";
    else if (sign === "always") prefix = "+";
  }
  return `${prefix}₪${number}`;
}

export function formatPercent(ratio: number, fractionDigits = 0) {
  return `${numberFormat(fractionDigits, fractionDigits).format(ratio * 100).replace(BIDI_MARKS, "")}%`;
}
