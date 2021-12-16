/* eslint-disable import/first */
import * as dotenv from "dotenv";

dotenv.config();
import jwt from "jsonwebtoken";
import chalk from "chalk";
import bcrypt from "bcrypt";
import Debug from "debug";

import User from "../../database/models/user";
import NewError from "../interfaces/generalerror";

const debug = Debug("gardenny:login");

const userRegister = async (req, res, next) => {
  const newUser = req.body;
  const getuser = await User.findOne({
    username: newUser.username,
  });
  if (getuser) {
    debug(chalk.red("Username in use, choose another one (T︵T,)"));
    const error = new NewError("Username already in use (T︵T,)");
    error.code = 400;
    next(error);
  } else {
    newUser.myFriends = [];
    newUser.myPlants = [];
    newUser.myPets = [];
    newUser.password = await bcrypt.hash(newUser.password, 10);

    User.create(newUser);
    res.json("User Registered");
  }
};

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    debug(chalk.red("Wrong Credentials ʰᵘʰ (ꐦ○_○）✧"));
    const error = new NewError("Wrong Credentials ʰᵘʰ (ꐦ○_○）✧");
    error.code = 401;
    next(error);
  } else {
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      debug(chalk.red("Wrong Credentials ʰᵘʰ (ꐦ○_○）✧"));
      const error = new NewError("Wrong Credentials ʰᵘʰ (ꐦ○_○）✧");
      error.code = 401;
      next(error);
    } else {
      const token = jwt.sign(
        { id: user.id, name: user.name },
        process.env.SECRET,
        { expiresIn: 72 * 60 * 60 }
      );
      res.json({ token });
    }
  }
};

export { userRegister, userLogin };
