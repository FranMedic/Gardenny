import { NextFunction, Response } from "express";
import User from "../../database/models/user";
import NewError from "../interfaces/generalerror";
import RequestAuth from "../interfaces/requestAuth";

const verifyPlant = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  const { idplant } = req.params;
  const user = await User.findById(req.userId);
  if (user.myPlants.includes(idplant)) {
    next();
  } else {
    const error = new NewError("You are not allowed to modify this id");
    error.code = 403;
    next(error);
  }
};

export default verifyPlant;
