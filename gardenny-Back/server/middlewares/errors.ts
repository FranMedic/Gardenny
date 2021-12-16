import chalk from "chalk";
import Debug from "debug";

import IError from "../interfaces/error";

const debug = Debug("gardenny:errors");

export const notFoundHandler = (req, res) => {
  res.status(404).json({ error: "Endpoint not found (╯°□°）╯︵ ┻━┻`" });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generalErrorMiddleware = (error: IError, req, res, next) => {
  debug(chalk.red("There was an error (╯°□°）╯︵ ┻━┻: ", error.message));
  if (error.statusCode === 400) {
    error.message = "Sent wrong format of request ! (╯°□°）╯︵ ┻━┻";
    error.code = 400;
  }
  const message = error.code
    ? error.message
    : "General Error of server (╯°□°）╯︵ ┻━┻";
  res.status(error.code || 500).json({ error: message });
};
