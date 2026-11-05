const SESSION_DAYS = 7;

export const COOKIE_NAME = "dotoo_token";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export const TOKEN_LIFETIME = `${SESSION_DAYS}d`;
export const COOKIE_MAX_AGE = SESSION_DAYS * 24 * 60 * 60 * 1000;
