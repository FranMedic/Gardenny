import { NextFunction, Response } from "express";
import User from "../../database/models/user";
import NewError from "../interfaces/generalerror";
import RequestAuth from "../interfaces/requestAuth";

const verifyPet = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  const { idpet } = req.params;
  const user = await User.findById(req.userId);
  if (user.myPets.includes(idpet)) {
    next();
  } else {
    const error = new NewError("You are not allowed to modify this id");
    error.code = 403;
    next(error);
  }
};

export default verifyPet;
