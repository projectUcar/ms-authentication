import { config } from "dotenv";
config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/UcarDB";
export const PORT = process.env.PORT || 4000;
export const SECRET_KEY = process.env.SECRET;
export const LENGTH_PASSWORD = 8;
export const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL