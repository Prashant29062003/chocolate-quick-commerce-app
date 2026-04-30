import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function apiResponse<T>(
  data: T,
  message: string = "Success",
  status: number = 200,
  meta: any = null
) {
  return NextResponse.json(
    {
      success: true,
      message,
      // Only include meta if it's not null
      ...(meta != null && { meta }),
      data,
    },
    { status }
  );
}

export function apiError(
  message: string = "Internal Server Error",
  status: number = 500,
  errors: any = null
) {
  let fonrmatedErrors = errors;

  if (errors instanceof ZodError) {
    fonrmatedErrors = errors.flatten().fieldErrors;
  }
  return NextResponse.json(
    {
      success: false,
      message,
      ...(errors != null && { errors: fonrmatedErrors }),
    },
    { status }
  );
}
