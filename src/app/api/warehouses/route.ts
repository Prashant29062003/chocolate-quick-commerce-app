import { db } from "@/db/db";
import { warehouses } from "@/db/schema";
import { apiError, apiResponse } from "@/lib/utils/api-utils";
import { warehouseSchema } from "@/lib/validators/warehouseSchema";

export async function POST(request: Request) {
  // TODO: Check User access by auth
  const requestData = await request.json();

  let validatedData;

  try {
    validatedData = await warehouseSchema.parse(requestData);
  } catch (err) {
    return apiError("Validation error", 400, err);
  }

  try {
    await db.insert(warehouses).values(validatedData);
    return apiResponse(validatedData, "OK", 201);
  } catch (err) {
    return apiError("Failed to store the warehouses", 500);
  }
}

export async function GET(request: Request) {
  try {
    const allWarehouses = await db.select().from(warehouses);
    return apiResponse(allWarehouses);
  } catch (err) {
    return apiError("Failed to fetch all warehouses", 500);
  }
}
