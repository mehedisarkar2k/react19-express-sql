import cors from "cors";
import { ENV } from "../config";

export const corsMiddleware = cors({
    origin: ENV.NODE_ENV === 'development' ? "*" : ENV.CORS_ORIGIN?.split(','),
    credentials: true,
});