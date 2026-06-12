import { scalekit } from "./scalekit";

type TokenPayload = {
  sub: string;
};

export type ResolvedSessionTokens = {
  accessToken: string;
  refreshToken?: string;
  refreshed: boolean;
};

export async function resolveSessionTokens(
  accessToken?: string,
  refreshToken?: string,
): Promise<ResolvedSessionTokens | null> {
  if (accessToken) {
    try {
      await scalekit.validateToken(accessToken);
      return { accessToken, refreshed: false };
    } catch {
      // Access token expired or invalid — try refresh below.
    }
  }

  if (!refreshToken) {
    return null;
  }

  try {
    const refreshed = await scalekit.refreshAccessToken(refreshToken);
    return {
      accessToken: refreshed.accessToken,
      refreshToken: refreshed.refreshToken ?? refreshToken,
      refreshed: true,
    };
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
}

export async function getUserFromAccessToken(accessToken: string) {
  const result = (await scalekit.validateToken(accessToken)) as TokenPayload;
  return scalekit.user.getUser(result.sub);
}
