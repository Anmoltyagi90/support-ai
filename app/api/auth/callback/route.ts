import { setAuthCookies } from "@/lib/authCookies";
import { scalekit } from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;

  if (!code) {
    return NextResponse.json({ message: "code is not found" }, { status: 400 });
  }

  const session = await scalekit.authenticateWithCode(code, redirectUri);

  if (!session.refreshToken) {
    return NextResponse.json(
      { message: "refresh token missing from auth response" },
      { status: 500 },
    );
  }

  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
  setAuthCookies(response, session.accessToken, session.refreshToken);
  return response;
}
