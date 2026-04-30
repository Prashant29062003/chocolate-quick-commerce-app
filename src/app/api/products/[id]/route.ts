import { db } from "@/db/db";
import { products } from "@/db/schema";
import { apiError, apiResponse } from "@/lib/utils/api-utils";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const productId = Number(id);
  if (isNaN(productId)) {
    return apiError("Invalid ID format", 400);
  }

  try {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (!product.length) {
      return apiResponse(null, "Product not found", 404);
    }

    return apiResponse(product[0], "Successfully fetched data", 200);
  } catch (err) {
    return apiError("Failed to fetch a product", 500);
  }
}
