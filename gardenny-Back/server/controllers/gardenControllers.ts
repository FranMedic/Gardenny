import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Response } from "express";

import Pet from "../../database/models/pet";
import Plant from "../../database/models/plant";

import User from "../../database/models/user";
import NewError from "../interfaces/generalerror";
import RequestAuth from "../interfaces/requestAuth";

const debug = Debug("gardenny:gardenController");

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate([
      { path: "myPlants" },
      { path: "myPets" },
      { path: "myFriends" },
    ]);

    if (user) {
      res.status(200).json(user);
    } else {
      const error = new NewError("User not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    debug(chalk.red(error.message));
    error.message = "We couldn't do the search";
    error.code = 400;
    next(error);
  }
};

const createNewPlant = async (req, res, next) => {
  try {
    const plant = req.body;
    const newPlant = await Plant.create(plant);
    await User.findOneAndUpdate(
      { _id: req.userId },
      { $push: { myPlants: newPlant.id } }
    );
    res.status(201).json(newPlant);
  } catch (error) {
    debug(chalk.red(error.message));
    error.code = 400;
    error.message = "Couldnt create the plant";
    next(error);
  }
};

const createNewPet = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const pet = req.body;
    const newPet = await Pet.create(pet);
    await User.findOneAndUpdate(
      { _id: req.userId },
      { $push: { myPets: newPet.id } }
    );
    res.status(201).json(newPet);
  } catch (error) {
    debug(chalk.red(error.message));
    error.code = 400;
    error.message = "Couldnt create the pet";
    next(error);
  }
};

const deletePlant = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idplant } = req.params;
    const deletedPlant = await Plant.findByIdAndDelete(idplant);
    if (!deletedPlant) {
      const error = new NewError("This plant doesnt exists");
      error.code = 404;
      next(error);
    } else {
      await User.findByIdAndUpdate(
        { _id: req.userId },
        { $pull: { myPlants: idplant } }
      );
      res.json(deletedPlant);
    }
  } catch (error) {
    debug(chalk.red(error.message));
    error.code = 400;
    error.message = "Couldn't delete the plant";
    next(error);
  }
};

const deletePet = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idpet } = req.params;
    const deletedPet = await Pet.findByIdAndDelete(idpet);
    if (!deletedPet) {
      const error = new NewError("This pet doesnt exists");
      error.code = 404;
      next(error);
    } else {
      await User.findByIdAndUpdate(
        { _id: req.userId },
        { $pull: { myPets: idpet } }
      );
      res.json(deletedPet);
    }
  } catch (error) {
    debug(chalk.red(error.message));
    error.code = 400;
    error.message = "Couldn't delete the pet";
    next(error);
  }
};

const plantWatering = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idplant } = req.params;
    const updatedPlant = await Plant.findByIdAndUpdate(
      idplant,
      { $inc: { waterCount: 1 }, deathTime: new Date() },

      { new: true }
    );
    if (!updatedPlant) {
      const error = new NewError("This plant doesnt exists");
      error.code = 404;
      next(error);
    } else {
      res.json(updatedPlant);
    }
  } catch (error) {
    debug(chalk.red(error.message));
    error.code = 400;
    error.message = "Couldn't update the plant properties";
    next(error);
  }
};

const plantFertilizing = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idplant } = req.params;
    const updatedPlant = await Plant.findByIdAndUpdate(
      idplant,
      { $inc: { fertilizeCount: 1 }, fertilizeTime: new Date() },
      { new: true }
    );
    if (!updatedPlant) {
      const error = new NewError("This plant doesnt exists");
      error.code = 404;
      next(error);
    } else {
      res.json(updatedPlant);
    }
  } catch (error) {
    debug(chalk.red(error.message));
    error.code = 400;
    error.message = "Couldn't update the plant properties";
    next(error);
  }
};

const petLoving = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idpet } = req.params;
    const updatedPet = await Pet.findByIdAndUpdate(
      idpet,
      { $inc: { loveCount: 1 }, loveTime: new Date() },
      { new: true }
    );
    if (!updatedPet) {
      const error = new NewError("This pet doesnt exists");
      error.code = 404;
      next(error);
    } else {
      res.json(updatedPet);
    }
  } catch (error) {
    debug(chalk.red(error.message));
    error.code = 400;
    error.message = "Couldn't update the pet properties";
    next(error);
  }
};

const petFeeding = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idpet } = req.params;
    const updatedPet = await Pet.findByIdAndUpdate(
      idpet,
      { $inc: { feedCount: 1 }, deathTime: new Date() },
      { new: true }
    );
    if (!updatedPet) {
      const error = new NewError("This pet doesnt exists");
      error.code = 404;
      next(error);
    } else {
      res.json(updatedPet);
    }
  } catch (error) {
    debug(chalk.red(error.message));
    error.code = 400;
    error.message = "Couldn't update the pet properties";
    next(error);
  }
};

const deathTime = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idelement } = req.params;
    const petCheck = await Pet.findById(idelement);

    if (petCheck === null) {
      debug(chalk.blue("No pet with the id"));
      const plantCheck = await Plant.findById(idelement);
      if (plantCheck === null) {
        const error = new NewError("This id doesnt exists");
        error.code = 404;
        next(error);
      } else {
        const deathTimeToMiliSecond = plantCheck.deathTime.getTime();
        const dateNow = new Date();
        const dateNowToMiliSecond = dateNow.getTime();
        const timeDifference = dateNowToMiliSecond - deathTimeToMiliSecond;

        debug(chalk.cyan(deathTimeToMiliSecond));
        debug(chalk.magentaBright(dateNowToMiliSecond));
        debug(chalk.greenBright(timeDifference));

        if (timeDifference > 4 * 60 * 1000) {
          const updatedDeath = await Plant.findByIdAndUpdate(
            idelement,
            { death: true },
            { new: true }
          );
          res.json(updatedDeath);
        } else {
          res.json(timeDifference);
        }
      }
    } else {
      const deathTimeToMiliSecond = petCheck.deathTime.getTime();
      const dateNow = new Date();
      const dateNowToMiliSecond = dateNow.getTime();
      const timeDifference = dateNowToMiliSecond - deathTimeToMiliSecond;

      debug(chalk.cyan(deathTimeToMiliSecond));
      debug(chalk.magentaBright(dateNowToMiliSecond));
      debug(chalk.greenBright(timeDifference));

      if (timeDifference > 4 * 60 * 1000) {
        const updatedDeath = await Pet.findByIdAndUpdate(
          idelement,
          { death: true },
          { new: true }
        );
        res.json(updatedDeath);
      } else {
        res.json(timeDifference);
      }
    }
  } catch (error) {
    debug(chalk.red(error.message));
    error.code = 400;
    error.message = "Couldn't update the status";
    next(error);
  }
};

const secondaryTimes = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idelement } = req.params;
    const petCheck = await Pet.findById(idelement);

    if (petCheck === null) {
      debug(chalk.blue("No pet with the id"));
      const plantCheck = await Plant.findById(idelement);
      if (plantCheck === null) {
        debug(chalk.blue("No plant with the id"));
        const error = new NewError("This id doesnt exists");
        error.code = 404;
        next(error);
      } else {
        const fertilizeTimeToMiliSecond = plantCheck.fertilizeTime.getTime();
        const dateNow = new Date();
        const dateNowToMiliSecond = dateNow.getTime();
        const secondaryTimeDifference =
          dateNowToMiliSecond - fertilizeTimeToMiliSecond;

        debug(chalk.cyan(fertilizeTimeToMiliSecond));
        debug(chalk.magentaBright(dateNowToMiliSecond));
        debug(chalk.greenBright(secondaryTimeDifference));

        res.json(secondaryTimeDifference);
      }
    } else {
      const loveTimeToMiliSecond = petCheck.loveTime.getTime();
      const dateNow = new Date();
      const dateNowToMiliSecond = dateNow.getTime();
      const secondaryTimeDifference =
        dateNowToMiliSecond - loveTimeToMiliSecond;

      debug(chalk.cyan(loveTimeToMiliSecond));
      debug(chalk.magentaBright(dateNowToMiliSecond));
      debug(chalk.greenBright(secondaryTimeDifference));

      res.json(secondaryTimeDifference);
    }
  } catch (error) {
    debug(chalk.red(error.message));
    error.code = 400;
    error.message = "Couldn't update the status";
    next(error);
  }
};

const plantGrow = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idplant } = req.params;
    const { newImage } = req.body;
    const updatePlant = await Plant.findByIdAndUpdate(
      idplant,
      { image: newImage },
      { new: true }
    );

    if (!updatePlant) {
      const error = new NewError("This plant doesnt exists");
      error.code = 404;
      next(error);
    } else {
      res.json(updatePlant);
    }
  } catch (error) {
    debug(chalk.red(error.message));
    error.code = 400;
    error.message = "Couldn't update the plant image";
    next(error);
  }
};

const petGrow = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const { idpet } = req.params;
    const { newImage } = req.body;
    const updatePet = await Pet.findByIdAndUpdate(
      idpet,
      { image: newImage },
      { new: true }
    );

    if (!updatePet) {
      const error = new NewError("This pet doesnt exists");
      error.code = 404;
      next(error);
    } else {
      res.json(updatePet);
    }
  } catch (error) {
    debug(chalk.red(error.message));
    error.code = 400;
    error.message = "Couldn't update the pet image";
    next(error);
  }
};

export {
  getUser,
  createNewPet,
  createNewPlant,
  deletePet,
  deletePlant,
  plantWatering,
  plantFertilizing,
  petLoving,
  petFeeding,
  deathTime,
  secondaryTimes,
  plantGrow,
  petGrow,
};
