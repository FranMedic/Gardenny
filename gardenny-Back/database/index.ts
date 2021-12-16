/* eslint-disable import/first */
import Debug from "debug";
import mongoose from "mongoose";
import chalk from "chalk";

const debug = Debug("gardenny:database");

const connectDB = (gardennyDB) =>
  new Promise<void>((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle
        delete ret.__v;
      },
    });

    mongoose.connect(gardennyDB, (error) => {
      if (error) {
        debug(chalk.red("Connection to DB failed  (╯°□°）╯︵ ┻━┻)"));
        debug(chalk.red(error.message));
        reject(error);
        return;
      }

      debug(chalk.magentaBright("Connection to DB succeful "));
      resolve();
    });
    mongoose.connection.on("close", () => {
      debug(chalk.blueBright("Desconected from DataBase"));
    });
  });

export default connectDB;
