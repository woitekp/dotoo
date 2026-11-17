const required = ["DATABASE_URL", "JWT_SECRET", "COOKIE_SECURE"];

for (const name of required) {
  if (!process.env[name]) {
    throw new Error(`Missing environment variable: ${name}`);
  }
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT || 3000;

export const COOKIE_SECURE = process.env.COOKIE_SECURE === "true";
