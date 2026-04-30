import { NextResponse } from "next/server";

export function apiResponse<T>(
  data: T,
  message: string = "Success",
  status: number = 200
) {
  return NextResponse.json(
    {
      success: true,
      message,
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
  return NextResponse.json(
    {
      success: false,
      message,
      errors,
    },
    { status }
  );
}
