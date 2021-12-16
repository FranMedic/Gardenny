import { Schema, model } from "mongoose";

interface PetInterface {
  name: string;
  image: string;
  loveCount: number;
  feedCount: number;
  death: boolean;
  deathTime: Date;
  loveTime: Date;
}

const PetSchema = new Schema<PetInterface>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  loveCount: {
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  },
  feedCount: {
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  },
  death: {
    type: Boolean,
    default: false,
  },
  deathTime: {
    type: Date,
    required: true,
  },

  loveTime: {
    type: Date,
    required: true,
  },
});

const Pet = model("Pet", PetSchema, "Pets");

export default Pet;
