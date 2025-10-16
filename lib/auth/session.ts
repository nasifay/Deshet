import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { verifyToken, type TokenPayload } from "./jwt";

const TOKEN_COOKIE_NAME = "admin_token";
const REFRESH_TOKEN_COOKIE_NAME = "admin_refresh_token";

/**
 * Set authentication cookies
 */
export async function setAuthCookies(token: string, refreshToken: string) {
  const cookieStore = await cookies();

  cookieStore.set(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  cookieStore.set(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
}

/**
 * Remove authentication cookies
 */
export async function removeAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete(TOKEN_COOKIE_NAME);
  cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);
}

/**
 * Get current session from cookies
 */
export async function getSession(): Promise<TokenPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    const payload = await verifyToken(token);
    return payload;
  } catch (error) {
    console.error("Session error:", error);
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}
/**
 * Check if user has required role
 */
export async function hasRole(
  requiredRole: string | string[]
): Promise<boolean> {
  const session = await getSession();

  if (!session) {
    return false;
  }

  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return roles.includes(session.role);
}

/**
 * Get user from request headers (set by middleware)
 */
export async function getUserFromRequest(
  request: NextRequest
): Promise<TokenPayload | null> {
  try {
    const userId = request.headers.get("x-user-id");
    const email = request.headers.get("x-user-email");
    const role = request.headers.get("x-user-role");

    if (!userId || !email || !role) {
      return null;
    }

    return {
      userId,
      email,
      role,
    };
  } catch (error) {
    console.error("Error getting user from request:", error);
    return null;
  }
}
