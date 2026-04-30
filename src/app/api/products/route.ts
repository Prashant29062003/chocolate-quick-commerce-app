import { db } from "@/db/db";
import { products } from "@/db/schema";
import { apiError, apiResponse } from "@/lib/utils/api-utils";
import { productSchema } from "@/lib/validators/productSchema";
import { unlink, writeFile } from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request) {
  // TODO: Check User Access.
  const data = await request.formData();

  let validatedData;

  try {
    validatedData = productSchema.parse({
      name: data.get("name"),
      image: data.get("image"),
      description: data.get("description"),
      price: data.get("price"),
    });
  } catch (err) {
    return apiError("Validation error", 400, err);
  }

  // original filename = choco.png
  // after this change filename = 12348023423.png
  const extension = validatedData.image.name.split(".").pop();
  const filename = `${Date.now()}.${extension}`;
  const filePath = path.join(process.cwd(), "public", "assets", filename);

  try {
    const buffer = Buffer.from(await validatedData.image.arrayBuffer());
    await writeFile(filePath, buffer);
  } catch (err) {
    return apiError("Failed to save file to fs", 500, err);
  }

  try {
    const updatedData = { ...validatedData, image: filename };
    await db.insert(products).values(updatedData);
    return apiResponse(data, "Product created successfully", 201);
  } catch (err) {
    // TODO: remove stored image from fs
    await unlink(filePath).catch(() => {}); // Silent catch in case of file didn't exist
    return apiError("Database insertion failed", 500, err);
  }

  return apiResponse(null, "OK", 201);
}
