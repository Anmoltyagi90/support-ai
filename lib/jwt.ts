export function isAccessTokenExpired(token: string, leewaySeconds = 60) {
  try {
    const payload = token.split(".")[1];
    if (!payload) {
      return true;
    }

    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    ) as { exp?: number };

    if (!decoded.exp) {
      return true;
    }

    return Date.now() / 1000 >= decoded.exp - leewaySeconds;
  } catch {
    return true;
  }
}
