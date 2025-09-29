import dayjs from "dayjs";
import { z } from "zod";
import { salary } from "./salary";

// Define the schema for events form validation

export const employeeListFormSchema = z.object({
  id: z.number().optional(),
  email: z.string().min(1, "Email is required"),
  firstname: z.string().min(1, "Firstname is required"),
  lastname: z.string().min(1, "Lastname is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  position: z.string().min(1, "Position is required"),
  salary,
  status: z.string().min(1, "Status is required"),
  address: z.string().min(1, "Address is required"),
  dateOfBirth: z.coerce
    .date({
      required_error: "Date of birth is required",
      invalid_type_error: "Invalid date format",
    })
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }),
});

// Export the inferred TypeScript type for the form values
export type EmployeeListFormValues = z.infer<typeof employeeListFormSchema>;
