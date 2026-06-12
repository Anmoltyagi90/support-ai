import { clearAuthCookies } from "@/lib/authCookies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
  clearAuthCookies(response);
  return response;
}
