import { z } from "zod";

// Define the schema for events form validation

export const assignProjectFormSchema = z.object({
  id: z.number().optional(),
  userId: z.number(),
  projectId: z.number(),
  employeeNumber: z.string().min(1, "Employee number is required"),
  employeeFullname: z.string().min(1, "Employee full name is required"),
  clientName: z.string().min(1, "Client name is required"),
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
});

// Export the inferred TypeScript type for the form values
export type AssignProjectFormValues = z.infer<typeof assignProjectFormSchema>;
