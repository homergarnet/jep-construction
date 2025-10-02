import { z } from "zod";

// Define the schema for profile form validation
export const profileFormSchema = z.object({
  id: z.number().optional(),
  firstname: z.string().min(1, "Firstname is required"),
  lastname: z.string().min(1, "Lastname is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  position: z.string().min(1, "Position is required"),
  address: z.string().min(1, "Address is required"),
  dateOfBirth: z.coerce.date({
    required_error: "Date of birth is required",
    invalid_type_error: "Invalid date format",
  }),
});

// Export the inferred TypeScript type for the form values
export type ProfileFormValues = z.infer<typeof profileFormSchema>;
