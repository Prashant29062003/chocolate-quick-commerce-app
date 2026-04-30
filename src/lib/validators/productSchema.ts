import { z } from "zod";

// Helper for max file size (e.g., 5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),

  image: z
    .instanceof(File, { message: "Product image is required." })
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),

  // Use coerce to automatically convert the string "100" from FormData to the number 100
  price: z.coerce
    .number()
    .positive("Price must be positive")
    .or(
      z.nan().transform(() => {
        throw new Error("Price must be a valid number");
      })
    ),
});
