import express from "express";
import {
  createNewPet,
  createNewPlant,
  deathTime,
  deletePet,
  deletePlant,
  getUser,
  petFeeding,
  petGrow,
  petLoving,
  plantFertilizing,
  plantGrow,
  plantWatering,
  secondaryTimes,
} from "../controllers/gardenControllers";
import verifyPet from "../middlewares/verifyPet";
import verifyPlant from "../middlewares/verifyPlant";

const router = express.Router();

router.get("/user", getUser);

router.post("/createplant", createNewPlant);

router.post("/createpet", createNewPet);

router.delete("/deleteplant/:idplant", verifyPlant, deletePlant);

router.delete("/deletepet/:idpet", verifyPet, deletePet);

router.patch("/wateringplant/:idplant", verifyPlant, plantWatering);

router.patch("/fertilizingplant/:idplant", verifyPlant, plantFertilizing);

router.patch("/lovingpet/:idpet", verifyPet, petLoving);

router.patch("/feedingpet/:idpet", verifyPet, petFeeding);

router.patch("/lifestatus/:idelement", deathTime);

router.get("/secondarystats/:idelement", secondaryTimes);

router.patch("/plantgrow/:idplant", verifyPlant, plantGrow);

router.patch("/petgrow/:idpet", verifyPet, petGrow);
export default router;
