import { z } from "zod";

// Define the schema for events form validation

export const crReplyFormSchema = z.object({
  id: z.number(),
  email: z.string().min(1, "Email is required"),
  message: z.string().min(1, "Message is required"),
});

// Export the inferred TypeScript type for the form values
export type CRReplyFormValues = z.infer<typeof crReplyFormSchema>;
