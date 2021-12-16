/* eslint-disable import/first */
import * as dotenv from "dotenv";

dotenv.config();
import connectDB from "./database";

import { initializeServer } from "./server";

const gardennyDB = process.env.MONGO_DB_GARDENNY;
const port = process.env.PORT ?? process.env.SERVER_PORT_GARDENNY ?? 6000;

(async () => {
  try {
    await connectDB(gardennyDB);
    await initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
