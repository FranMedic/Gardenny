import { NextFunction, Response } from "express";
import User from "../../database/models/user";
import NewError from "../interfaces/generalerror";
import RequestAuth from "../interfaces/requestAuth";

const verifyId = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  const { idelement } = req.params;
  const user = await User.findById(req.userId);
  if (user.myPets.includes(idelement)) {
    next();
  } else if (user.myPlants.includes(idelement)) {
    next();
  } else {
    const error = new NewError("You are not allowed to modify this id");
    error.code = 403;
    next(error);
  }
};

export default verifyId;
