import dotenv from "dotenv";
import { schema } from "./schema";
import { Validate } from "./validators";
import { ConfigTypes } from "../types";
dotenv.config();

// validate environment variables
const envVarsSchema = Validate(schema);

const { error, value: envVariables } = envVarsSchema.validate(process.env);
if (error) throw new Error(`Config validation error: ${error.message}`);

export const config: ConfigTypes = {
  EMAIL_VERIFICATION_URL: envVariables.EMAIL_VERIFICATION_URL,
  NODE_ENV: envVariables.NODE_ENV,
  APP_NAME: envVariables.APP_NAME,
  PORT: envVariables.PORT,
  LOCAL_PORT: envVariables.LOCAL_PORT,
  APP_URL: envVariables.APP_URL,
  MONGODB_URI: envVariables.MONGODB_URI,
  JWT_SECRET: envVariables.JWT_SECRET,
  SESSION_SECRET: envVariables.SESSION_SECRET,
  REFRESH_TOKEN_SECRET: envVariables.REFRESH_TOKEN_SECRET,
  STRIPE_SECRET_KEY: envVariables.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: envVariables.STRIPE_WEBHOOK_SECRET,
  ACCESS_TOKEN_VALIDITY: envVariables.ACCESS_TOKEN_VALIDITY,
  REDIS_HOST: envVariables.REDIS_HOST,
  REDIS_PORT: envVariables.REDIS_PORT,
  REDIS_PASSWORD: envVariables.REDIS_PASSWORD,
  REDIS_USERNAME: envVariables.REDIS_USERNAME,
  REDIS_DB: envVariables.REDIS_DB,
  SUPPORT_EMAIL: envVariables.SUPPORT_EMAIL,
  COMMUNITY_EMAIL: envVariables.COMMUNITY_EMAIL,
};
