import { Joi } from "express-validation";

const registerRequestSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    avatar: Joi.string().optional(),
  }),
};

const loginRequestSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export { registerRequestSchema, loginRequestSchema };
