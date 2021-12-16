import User from "../../database/models/user";
import NewError from "../interfaces/generalerror";
import mockRequestAuth from "../utils/mocks/mockRequestAuth";

import verifyPlant from "./verifyPlant";

jest.mock("../../database/models/user");

describe("Given a verifyPlant middleware", () => {
  describe("When it receives a plant id within the user id requester", () => {
    test("Then it should call method next", async () => {
      const req = mockRequestAuth(null, null, { idplant: 1 });
      const next = jest.fn();
      const user = {
        myPlants: [1],
      };

      User.findById = jest.fn().mockResolvedValue(user);

      await verifyPlant(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
  describe("When it receives a plat id not included in the user id requester", () => {
    test("Then it should invoke an error with a message'You are not allowed to modify this id'", async () => {
      const req = mockRequestAuth(null, null, { idplant: 1 });
      const next = jest.fn();
      const error = new NewError("You are not allowed to modify this id");
      const user = {
        myPlants: [2],
      };

      User.findById = jest.fn().mockResolvedValue(user);

      await verifyPlant(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
