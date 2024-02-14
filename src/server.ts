
import { Server, createServer } from "http";
import app from "./app";
import { config } from "./config/env";
import { connectDB } from "./config/database";
// import { connectRedis } from "./utils/cacheManager";
import cors from "cors";

const server = createServer(app);

const { LOCAL_PORT, PORT } = config;

connectDB()
  .then(() => {
    const port = PORT || LOCAL_PORT;
    server.listen(port, () => {
      console.log(`server running on *::${port}`);

    });
  })
  .catch((error) => console.log(`Database connection failed": ${error.message}`))