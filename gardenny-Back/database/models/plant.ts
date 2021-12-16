import { Schema, model } from "mongoose";

interface PlantInterface {
  name: string;
  image: string;
  waterCount: number;
  fertilizeCount: number;
  death: boolean;
  deathTime: Date;
  fertilizeTime: Date;
}

const PlantSchema = new Schema<PlantInterface>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  waterCount: {
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  },
  fertilizeCount: {
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

  fertilizeTime: {
    type: Date,
    required: true,
  },
});

const Plant = model("Plant", PlantSchema, "Plants");

export default Plant;
