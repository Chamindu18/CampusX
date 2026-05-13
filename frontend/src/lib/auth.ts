/**
 * Authentication utilities.
 */

import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET!;

/**
 * JWT payload type.
 */
interface TokenPayload {
  userId: string;
  email: string;
}

/**
 * Create authentication token.
 */
export function createToken(
  payload: TokenPayload
) {
  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

/**
 * Verify JWT token.
 */
export function verifyToken(
  token: string
) {
  try {
    return jwt.verify(
      token,
      JWT_SECRET
    ) as TokenPayload;
  } catch {
    return null;
  }
}