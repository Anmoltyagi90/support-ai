import { cookies } from "next/headers";
import { scalekit } from "./scalekit";

type TokenPayload = {
  sub: string;
};

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const result = (await scalekit.validateToken(token)) as TokenPayload;

    const user = await scalekit.user.getUser(result.sub);

    return user;
  } catch (error) {
    console.error("Session validation failed:", error);
    return null;
  }
}