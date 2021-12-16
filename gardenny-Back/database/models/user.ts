import { model, ObjectId, Schema, Types } from "mongoose";

interface UserInterface {
  name: string;
  username: string;
  password: string;
  avatar: string;
  myPlants: ObjectId[];
  myPets: ObjectId[];
  myFriends: ObjectId[];
}

const UserSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    optional: true,
  },
  myPlants: {
    type: [Types.ObjectId],
    ref: "Plant",
  },
  myPets: {
    type: [Types.ObjectId],
    ref: "Pet",
  },
  myFriends: {
    type: [Types.ObjectId],
    ref: "User",
  },
});

const User = model("User", UserSchema, "Users");

export default User;
