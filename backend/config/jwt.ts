import jwt, { type SignOptions } from "jsonwebtoken";

export type JwtPayload = {
  id: number;
  email?: string;
  username?: string;
  role?: string;
  phone?: string;
  address?: string;
};

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function signAccessToken(payload: JwtPayload, options: SignOptions = {}) {
  return jwt.sign(payload, getRequiredEnv("JWT_SECRET"), {
    expiresIn: "1h",
    ...options,
  });
}

export function signRefreshToken(payload: JwtPayload, options: SignOptions = {}) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || getRequiredEnv("JWT_SECRET"), {
    expiresIn: "7d",
    ...options,
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, getRequiredEnv("JWT_SECRET")) as JwtPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET || getRequiredEnv("JWT_SECRET")) as JwtPayload;
}
