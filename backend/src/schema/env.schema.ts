import { z } from "zod";

export const EnvSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.string().default("8000"),
    DB_HOST: z.string().min(1, "DB_HOST is required"),
    DB_PORT: z.coerce.number().default(5432),
    DB_USER: z.string().min(1, "DB_USER is required"),
    DB_PASSWORD: z.string().min(1, "DB_PASSWORD is required"),
    DB_NAME: z.string().min(1, "DB_NAME is required"),
});