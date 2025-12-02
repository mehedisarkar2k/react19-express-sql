import { z } from "zod";

export const EnvSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.string().default("8000"),
    PG_CONNECTION_STRING: z.string().min(1, "PG_CONNECTION_STRING is required"),
});