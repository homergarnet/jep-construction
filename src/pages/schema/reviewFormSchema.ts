import { z } from "zod";

// Define the schema for events form validation
export const reviewFormSchema = z.object({
  id: z.number().optional(),
  rate: z.number(),
  reviewDescription: z.string().min(1, "Review description is required"),
});

// Export the inferred TypeScript type for the form values
export type ReviewFormValues = z.infer<
  typeof reviewFormSchema
>;
