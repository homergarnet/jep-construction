import dayjs from "dayjs";
import { z } from "zod";
import { salary } from "./salary";
import { budget } from "./budget";

// Define the schema for events form validation

export const projectManagementFormSchema = z.object({
  id: z.number().optional(),
  userId: z.number(),
  projectName: z.string().min(1, "Project name is required"),
  startDate: z.coerce
    .date({
      required_error: "Start date is required",
      invalid_type_error: "Invalid date format",
    })
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }),
  endDate: z.coerce
    .date({
      required_error: "End date is required",
      invalid_type_error: "Invalid date format",
    })
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }),
  // budget,
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  // completionStatus: z.number(),
});

// Export the inferred TypeScript type for the form values
export type ProjectManagementFormValues = z.infer<
  typeof projectManagementFormSchema
>;
