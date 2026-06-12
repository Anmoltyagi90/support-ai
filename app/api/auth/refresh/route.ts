import {
  REFRESH_TOKEN_COOKIE,
  clearAuthCookies,
  setAuthCookies,
} from "@/lib/authCookies";
import { scalekit } from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const refreshToken = req.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
  const redirectTo = req.nextUrl.searchParams.get("redirect") || "/";

  if (!refreshToken) {
    const response = NextResponse.redirect(new URL("/", req.url));
    clearAuthCookies(response);
    return response;
  }

  try {
    const refreshed = await scalekit.refreshAccessToken(refreshToken);
    const response = NextResponse.redirect(
      new URL(redirectTo, req.nextUrl.origin),
    );
    setAuthCookies(
      response,
      refreshed.accessToken,
      refreshed.refreshToken ?? refreshToken,
    );
    return response;
  } catch (error) {
    console.error("Token refresh failed:", error);
    const response = NextResponse.redirect(new URL("/", req.url));
    clearAuthCookies(response);
    return response;
  }
}
