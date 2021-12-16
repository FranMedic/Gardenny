/* eslint-disable import/first */
import * as dotenv from "dotenv";

dotenv.config();
import jwt from "jsonwebtoken";
import NewError from "../interfaces/generalerror";

const auth = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    const error = new NewError("Not authorized");
    error.code = 401;
    next(error);
  } else {
    const [, token] = authHeader.split(" ");
    if (!token) {
      const error = new NewError("Token is missing...");
      error.code = 401;
      next(error);
    } else {
      try {
        const userData = await jwt.verify(token, process.env.SECRET);
        req.userId = userData.id;
        req.userName = userData.name;
        next();
      } catch {
        const error = new NewError("Wrong token");
        error.code = 401;
        next(error);
      }
    }
  }
};

export default auth;
