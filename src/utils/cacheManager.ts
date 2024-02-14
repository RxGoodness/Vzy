import * as redis from "redis";
import { config } from "../config/env";

const { REDIS_PORT, REDIS_HOST, REDIS_PASSWORD, REDIS_USERNAME, REDIS_DB } =
  config;

// confirm this change
const redisClient = redis.createClient({
  socket: {
    host: REDIS_HOST as string,
    port: Number(REDIS_PORT),
  },
  password: REDIS_PASSWORD,
  username: REDIS_USERNAME,
  database: Number(REDIS_DB),
});

redisClient.on("ready", () => {
  console.log("Redis client connected");
});
redisClient.on("error", (err) => {
  //console.log("Redis error.", err);
});

export const connectRedis = async () => await redisClient.connect();

let cache: any;
try {
  cache = {
    ...redisClient,
    getAsync: async (key: string) => await redisClient.get(key),
    setAsync: async (key: string, value: any) =>
      await redisClient.set(key, value),
    clear: async (key: string) => await redisClient.del(key),
    ttlAsync: async (key: string) => await redisClient.ttl(key),
    expireAsync: async (key: string, seconds: number) =>
      await redisClient.expire(key, seconds),
  };
} catch (error: any) {
  console.log("redis error", error);
}

export default cache as typeof redisClient & {
  getAsync: typeof redisClient.get;
  setAsync: typeof redisClient.set;
  clear: typeof redisClient.del;
};
