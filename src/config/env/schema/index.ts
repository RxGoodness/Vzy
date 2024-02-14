import { Joi } from "celebrate";

// define validation for all the env vars
export const schema = {
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),
  APP_NAME: Joi.string().required(),
  PORT: Joi.number().default(5000),
  LOCAL_PORT: Joi.number().default(3003),
  APP_URL: Joi.string().required(),
  MONGODB_URI: Joi.string()
    .description("Production Database host name")
    .required(),
  JWT_SECRET: Joi.string().required(),
  SESSION_SECRET: Joi.string().required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  EMAIL_DOMAIN: Joi.string().required(),
  STRIPE_SECRET_KEY: Joi.string().required(),
  STRIPE_WEBHOOK_SECRET: Joi.string().required(),
  ACCESS_TOKEN_VALIDITY: Joi.number().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_PASSWORD: Joi.string().required(),
  REDIS_USERNAME: Joi.string().required(),
  REDIS_DB: Joi.number().required(),
};
