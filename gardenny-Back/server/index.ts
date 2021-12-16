import express from "express";
import cors from "cors";
import morgan from "morgan";
import chalk from "chalk";
import Debug from "debug";
import { generalErrorMiddleware, notFoundHandler } from "./middlewares/errors";
import gardenRoutes from "./routes/gardenRoutes";
import loginRoutes from "./routes/loginRoutes";
import auth from "./middlewares/auth";

const debug = Debug("gardenny:server");

const app = express();
app.use(cors());

const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Listen to port: ${port}`));
    });

    server.on("error", (error: any) => {
      debug(chalk.red("we have an error"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`The port ${port} is already in use (╯°□°）╯︵ ┻━┻`));
        reject(error);
      }
    });
    resolve(server);
  });

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  debug(chalk.green("REQUEST ARRIVED ʕง•ᴥ•ʔง"));
  next();
});
app.use("/gardenny", loginRoutes);
app.use("/gardenny/mygarden", auth, gardenRoutes);

app.use(notFoundHandler);
app.use(generalErrorMiddleware);

export { initializeServer, app };
