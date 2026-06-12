import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "./authCookies";
import { getUserFromAccessToken, resolveSessionTokens } from "./refreshSession";

export async function getSession() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!accessToken && !refreshToken) {
    return null;
  }

  try {
    const session = await resolveSessionTokens(accessToken, refreshToken);
    if (!session) {
      return null;
    }

    return await getUserFromAccessToken(session.accessToken);
  } catch (error) {
    console.error("Session validation failed:", error);
    return null;
  }
}
