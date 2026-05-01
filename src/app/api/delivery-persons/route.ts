import { db } from "@/db/db";
import { deliveryPersons } from "@/db/schema";
import { apiError, apiResponse } from "@/lib/utils/api-utils";
import { deliveryPersonSchema } from "@/lib/validators/deliveryPersonSchema";

export async function POST(request: Request) {
  const requestData = await request.json();

  let validateData;
  try {
    validateData = deliveryPersonSchema.parse(requestData);
  } catch (err) {
    return apiError("Validation error", 400, err);
  }

  try {
    await db.insert(deliveryPersons).values(validateData);
    return apiResponse(
      validateData,
      "Delivery person inserted in database",
      201
    );
  } catch (err) {
    return apiError("Failed to store the delivery person on the database", 500);
  }
}
