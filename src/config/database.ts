import { connect } from "mongoose";
import { config } from "./env";

const { MONGODB_URI } = config;

export const connectDB = async () => {
  connect(MONGODB_URI)
    .then(() => console.log("database connection successful"))
    .catch((error) => {
      console.log(`database connection failed, Database connection failed": ${error.message}, exiting now...`);
      process.exit();
    });
};
