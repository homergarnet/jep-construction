import { z } from "zod";

/** Matches:
 *  • 1234
 *  • 1,234
 *  • 12,345.6
 *  • 12,345.67
 *  • 0.99
 */
const commaDecimalRegex = /^(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{1,2})?$/;

export const hourlyRate = z.preprocess(
  (raw) => {
    if (raw == null || raw === "") return undefined; // ✅ allow empty
    if (typeof raw === "number") return raw;
    if (typeof raw !== "string") return NaN;

    const trimmed = raw.trim();
    if (!commaDecimalRegex.test(trimmed)) return NaN;

    return Number(trimmed.replace(/,/g, ""));
  },
  z
    .number({
      invalid_type_error: "Must be a valid number",
    })
    .finite({ message: "Must be a valid number" })
    .refine(
      (val) => {
        // Ensure up to 2 decimal places
        const decimalPart = val.toString().split(".")[1];
        return !decimalPart || decimalPart.length <= 2;
      },
      { message: "Must have at most 2 decimal places" }
    )
    .optional() // ✅ optional
);
