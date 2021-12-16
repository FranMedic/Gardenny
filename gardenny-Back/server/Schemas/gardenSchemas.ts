import { Joi } from "express-validation";

const createPlantRequestSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    deathTime: Joi.date().required(),
    fertilizeTime: Joi.date().required(),
  }),
};

const createPetRequestSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    deathTime: Joi.date().required(),
    loveTime: Joi.date().required(),
  }),
};

export { createPetRequestSchema, createPlantRequestSchema };
