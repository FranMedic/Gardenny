import express from "express";
import { validate } from "express-validation";

import { userLogin, userRegister } from "../controllers/loginControllers";
import {
  loginRequestSchema,
  registerRequestSchema,
} from "../Schemas/userSchemas";

const router = express.Router();

router.post("/login", validate(loginRequestSchema), userLogin);

router.post("/register", validate(registerRequestSchema), userRegister);

export default router;
