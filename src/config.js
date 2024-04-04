import { config } from "dotenv";
config();

export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT || 4000;
export const SECRET_KEY = process.env.SECRET;
export const LENGTH_PASSWORD = 8;
export const LOCAL_HOST_BASE_URL = process.env.LOCAL_HOST_BASE_URL
export const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL
export const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL
export const EMAIL_UCAR = process.env.EMAIL_UCAR
export const CLIENT_ID = process.env.CLIENT_ID
export const SECRET_ID = process.env.SECRET_ID
export const JWT_REFRESH = process.env.JWT_REFRESH
export const ENV_UCAR = process.env.ENV_UCAR