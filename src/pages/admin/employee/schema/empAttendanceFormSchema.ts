import { z } from "zod";

export const empAttendanceFormSchema = z.object({
  id: z.number().optional(),
  timeInOut: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val).toISOString() : val),
    z.string().datetime({ offset: true, message: "Invalid datetime" })
  ),
  timeInOutType: z.string().min(1, "TimeInOut Type is required"),
});

// Export the inferred TypeScript type for the form values
export type EmpAttendanceFormValues = z.infer<typeof empAttendanceFormSchema>;
