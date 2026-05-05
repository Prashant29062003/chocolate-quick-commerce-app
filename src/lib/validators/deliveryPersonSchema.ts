import z from "zod";

export const deliveryPersonSchema = z.object({
  name: z
    .string({ message: "Name must be a string" })
    .min(2, "Name must be at least 2 characters")
    .trim(),

  phone: z
    .string({ message: "Phone number is required" })
    // Regex handles the format validation
    .regex(/^\+?[1-9]\d{1,12}$/, "Invalid phone number format"),

  warehouseId: z.coerce
    .number({ message: "Warehouse ID must be a number" })
    .positive("Warehouse ID must be a valid positive number"),

  orderId: z.coerce.number().positive().optional().nullable(),
});
