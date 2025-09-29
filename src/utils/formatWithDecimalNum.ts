/**
 * Strip everything except digits and a single decimal point,
 * trim to a configurable number of decimal places (default = 2),
 * and add thousands-separating commas to the integer part.
 *
 * @param value            Raw string (e.g. from an <input>)
 * @param maxDecimalPlaces How many decimal places to keep (0+). Default is 2.
 * @returns                Formatted string, e.g. "12,345.67"
 */
export const formatWithDecimalNum = (
  value: string,
  maxDecimalPlaces = 2
): string => {
  // 1️⃣ Remove everything except digits and dots
  let clean = value.replace(/[^\d.]/g, "");

  // 2️⃣ Make sure there’s only one dot
  clean = clean.replace(/(\..*?)\./g, "$1");

  // 3️⃣ Limit to the requested number of decimal places
  if (maxDecimalPlaces > 0) {
    const re = new RegExp(`^(\\d+)(\\.\\d{0,${maxDecimalPlaces}})?.*$`);
    clean = clean.replace(re, "$1$2"); // keep ≤ maxDecimalPlaces
  } else {
    clean = clean.replace(/\..*$/, ""); // drop decimals entirely
  }

  // 4️⃣ Split into integer & decimal parts, remove leading zeros from integer part
  const [intPart = "", decPart] = clean.split(".");
  const intStripped = intPart.replace(/^0+(?!$)/, ""); // this removes leading zeros
  const intWithCommas = intStripped.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // 5️⃣ Re-assemble and return
  return decPart !== undefined ? `${intWithCommas}.${decPart}` : intWithCommas;
};
