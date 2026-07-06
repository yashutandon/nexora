import { z } from "zod";

/**
 * Validates Environment Variables at Build/Run time.
 * If variables are missing or invalid, the app will throw a clear error.
 */
const envSchema = z.object({
  // Backend API URL
  NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:8000/api"),
  // Node Environment
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const processEnv = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NODE_ENV: process.env.NODE_ENV,
};

const parsed = envSchema.safeParse(processEnv);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
