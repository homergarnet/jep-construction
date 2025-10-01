import dayjs from "dayjs";
import { z } from "zod";

// Define the schema for events form validation

export const inventoryFormSchema = z.object({
  id: z.number().optional(),
  userId: z.number().min(1, "Client name is required"),
  itemName: z.string().min(1, "Item name is required"),
  category: z.string().min(1, "Category is required"),
  quantity: z.number().min(1, "Quantity is required"),
  unitOfMeasure: z.string().min(1, "Unit of Measure is required"),
  reOrderLevel: z.number().min(1, "RE order level is required"),
  reOrderQuantity: z.number().min(1, "RE order quantity is required"),
  description: z.string().min(1, "Description is required"),
});

// Export the inferred TypeScript type for the form values
export type InventoryFormValues = z.infer<typeof inventoryFormSchema>;
