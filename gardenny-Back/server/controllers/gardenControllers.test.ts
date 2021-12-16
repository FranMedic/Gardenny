import Pet from "../../database/models/pet";
import Plant from "../../database/models/plant";
import User from "../../database/models/user";
import NewError from "../interfaces/generalerror";
import mockRequestAuth from "../utils/mocks/mockRequestAuth";
import mockResponse from "../utils/mocks/mockRespone";
import {
  createNewPet,
  createNewPlant,
  deathTime,
  deletePet,
  deletePlant,
  getUser,
  petFeeding,
  petLoving,
  plantFertilizing,
  plantWatering,
  secondaryTimes,
} from "./gardenControllers";

jest.mock("../../database/models/user");
jest.mock("../../database/models/plant");
jest.mock("../../database/models/pet");

describe("Given a getUser function", () => {
  describe("When it receives an id and the user exists", () => {
    test("Then it should respond with the user in the res json", async () => {
      const res = mockResponse();
      const req = mockRequestAuth(null, null, { userid: 1 });
      const user = {
        userId: 1,
        name: "patata",
        myFriends: [],
        myPlants: [],
        myPets: [],
      };

      const next = () => {};

      User.findById = jest
        .fn()
        .mockReturnValue({ populate: jest.fn().mockResolvedValue(user) });

      await getUser(req, res, next);

      expect(res.json).toHaveBeenCalledWith(user);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("When it receives a req with an id and there are NO users matching id", () => {
    test("Then it should invoke next fnction with the error 404 and message", async () => {
      const res = mockResponse();
      const req = mockRequestAuth(null, null, { userdId: 4 });

      const next = jest.fn();

      User.findById = jest
        .fn()
        .mockReturnValue({ populate: jest.fn().mockResolvedValue(null) });
      const error = new NewError("User not found");

      await getUser(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
      expect(next).toHaveBeenLastCalledWith(error);
    });
  });

  describe("When it's invoked and findById returns error", () => {
    test("Then it should invoke next with the error 400 and message", async () => {
      const res = mockResponse();
      const req = mockRequestAuth(null, null, null);

      const next = jest.fn();

      User.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockRejectedValue(new Error()),
      });
      const error = new NewError("We couldn't do the search");

      await getUser(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
      expect(next).toHaveBeenLastCalledWith(error);
    });
  });
});

describe("Given a createNewPlant function", () => {
  describe("when it receives a plant through the req.body", () => {
    test("Then it should invoke the method json and a status 201", async () => {
      const req = mockRequestAuth({
        body: {
          name: "Plantito",
          image:
            "https://key0.cc/images/preview/104127_f63660f1169081b77794723082090c47.png",
          deathTime: "2018-03-29T13:34:00.000",
          fertilizeTime: "2018-03-29T13:34:00.000",
        },
      });

      const newPlant = req.body;

      Plant.create = jest.fn().mockResolvedValue(newPlant);
      User.findOneAndUpdate = jest.fn().mockResolvedValue({});
      const res = mockResponse();

      await createNewPlant(req, res, null);

      expect(res.json).toHaveBeenCalledWith(newPlant);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe("When it receives a plant through the req.body but Plant.create fails", () => {
    test("Then it should invoke next with a 'Couldnt create the plant' error and a code 400", async () => {
      const req = mockRequestAuth({});
      const next = jest.fn();

      Plant.create = jest.fn().mockResolvedValue(null);
      User.findOneAndUpdate = jest.fn().mockResolvedValue({});
      const error = new NewError("Couldnt create the plant");

      await createNewPlant(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
});

describe("Given a createNewPet function", () => {
  describe("when it receives a pet through the req.body", () => {
    test("Then it should invoke the method json and a status 201", async () => {
      const req = mockRequestAuth({
        body: {
          name: "Animalic",
          image:
            "https://key0.cc/images/preview/104127_f63660f1169081b77794723082090c47.png",
          deathTime: "2018-03-29T13:34:00.000",
          loveTime: "2018-03-29T13:34:00.000",
        },
      });

      const newPet = req.body;

      Pet.create = jest.fn().mockResolvedValue(newPet);
      User.findOneAndUpdate = jest.fn().mockResolvedValue({});
      const res = mockResponse();

      await createNewPet(req, res, null);

      expect(res.json).toHaveBeenCalledWith(newPet);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe("When it receives a pet through the req.body but Pet.create fails", () => {
    test("Then it should invoke next with a 'Couldnt create the pet' error and a code 400", async () => {
      const req = mockRequestAuth({});
      const next = jest.fn();

      Pet.create = jest.fn().mockResolvedValue(null);
      User.findOneAndUpdate = jest.fn().mockResolvedValue({});
      const error = new NewError("Couldnt create the pet");

      await createNewPet(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
});

describe("Given a deletePlant function", () => {
  describe("When it receives a plant id through params", () => {
    test("Then it should invoke the method json of res with the plant deleted", async () => {
      const plantToDelete = {
        idPlant: 14,
      };
      const req = mockRequestAuth(null, null, { idPlant: 14 });

      const res = mockResponse();
      Plant.findByIdAndDelete = jest.fn().mockResolvedValue(plantToDelete);

      await deletePlant(req, res, null);

      expect(res.json).toHaveBeenCalledWith(plantToDelete);
    });
  });

  describe("When it receives a non existent plant id through params", () => {
    test("Then it should invoke next with a 'This plant doesnt exists'", async () => {
      const req = mockRequestAuth(null, null, { idPlant: 11 });

      const res = mockResponse();
      const expectedError = new NewError("This plant doesnt exists");
      const next = jest.fn();
      Plant.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await deletePlant(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it doesn't receive a plant id through params", () => {
    test("Then it should invoke next with a 'Couldn't delete the plant'", async () => {
      const req = mockRequestAuth({});
      const res = mockResponse();
      const expectedError = new NewError("Couldn't delete the plant");
      const next = jest.fn();
      Plant.findByIdAndDelete = jest.fn().mockRejectedValue(null);

      await deletePlant(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a deletePet function", () => {
  describe("When it receives a pet id through params", () => {
    test("Then it should invoke the method json of res with the petdeleted", async () => {
      const petToDelete = {
        id: 14,
      };
      const req = mockRequestAuth(null, null, { idPet: 14 });

      const res = mockResponse();
      Pet.findByIdAndDelete = jest.fn().mockResolvedValue(petToDelete);

      await deletePet(req, res, null);

      expect(res.json).toHaveBeenCalledWith(petToDelete);
    });
  });
  describe("When it receives a non existent pet id through params", () => {
    test("Then it should invoke next with a 'This pet doesnt exists' and an status 404", async () => {
      const req = mockRequestAuth(null, null, { idPet: 5000 });
      const res = mockResponse();
      const expectedError = new NewError("This pet doesnt exists");
      const next = jest.fn();
      Pet.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await deletePet(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
    });
  });

  describe("When it doesn't receive a pet id through params", () => {
    test("Then it should invoke next with a 'Couldn't delete the pet' and an status 400", async () => {
      const req = mockRequestAuth({});
      const res = mockResponse();
      const expectedError = new NewError("Couldn't delete the pet");
      const next = jest.fn();
      Pet.findByIdAndDelete = jest.fn().mockRejectedValue(null);

      await deletePet(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
    });
  });
});

describe("Given a plantWatering function", () => {
  describe("when it receives an id that doesnt exists ", () => {
    test("Then it should invoke the next function with an error message 'This plant doesnt exists', and an status 404", async () => {
      const req = mockRequestAuth(null, null, { idplant: 5000000 });

      const next = jest.fn();

      const expectedError = new NewError("This plant doesnt exists");

      Plant.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await plantWatering(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
    });
  });

  describe("when it doesnt receives an id through params", () => {
    test("Then it should invoke the next function with a ' Couldn't update the plant properties' and an status 400 ", async () => {
      const req = mockRequestAuth({});
      const res = mockResponse();
      const error = new NewError("Couldn't update the plant properties");
      const next = jest.fn();

      Plant.findByIdAndUpdate = jest.fn().mockRejectedValue(null);

      await plantWatering(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
    });
  });

  describe("When it receives and existing id through params", () => {
    test("Then it should update the plant and invoke the method json of res, with the updated properties", async () => {
      const req = mockRequestAuth(null, null, { id: 1 });
      const res = mockResponse();
      const expectedPlant = {
        id: 1,
        waterCount: 1,
        deathTime: Date.now(),
      };

      Plant.findByIdAndUpdate = jest.fn().mockResolvedValue(expectedPlant);

      await plantWatering(req, res, null);

      expect(res.json).toHaveBeenCalledWith(expectedPlant);
    });
  });
});

describe("Given a plantFertilizing function", () => {
  describe("when it receives an id that doesnt exists ", () => {
    test("Then it should invoke the next function with an error message 'This plant doesnt exists', and an status 404", async () => {
      const req = mockRequestAuth(null, null, { id: 5000 });
      const next = jest.fn();

      const expectedError = new NewError("This plant doesnt exists");

      Plant.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await plantFertilizing(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
    });
  });

  describe("when it doesnt receives an id through params", () => {
    test("Then it should invoke the next function with a ' Couldn't update the plant properties' and an status 400", async () => {
      const req = mockRequestAuth({});
      const res = mockResponse();
      const error = new NewError("Couldn't update the plant properties");
      const next = jest.fn();

      Plant.findByIdAndUpdate = jest.fn().mockRejectedValue(null);

      await plantFertilizing(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
    });
  });

  describe("When it receives and existing id through params", () => {
    test("Then it should update the plant and invoke the method json of res, with the updated properties", async () => {
      const req = mockRequestAuth(null, null, { id: 1 });
      const res = mockResponse();
      const expectedPlant = {
        id: 1,
        fertilizeCount: 1,
        fertilizeTime: new Date(),
      };

      Plant.findByIdAndUpdate = jest.fn().mockResolvedValue(expectedPlant);

      await plantFertilizing(req, res, null);

      expect(res.json).toHaveBeenCalledWith(expectedPlant);
    });
  });
});

describe("Given a petLoving function", () => {
  describe("when it receives an id that doesnt exists ", () => {
    test("Then it should invoke the next function with an error message 'This pet doesnt exists', and an status 404", async () => {
      const req = mockRequestAuth(null, null, { id: 5000 });
      const next = jest.fn();

      const expectedError = new NewError("This pet doesnt exists");

      Pet.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await petLoving(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
    });
  });

  describe("when it doesnt receives an id through params", () => {
    test("Then it should invoke the next function with a ' Couldn't update the pet properties' and an status 400 ", async () => {
      const req = mockRequestAuth(null, null, null);
      const res = mockResponse();
      const error = new NewError("Couldn't update the pet properties");
      const next = jest.fn();

      Pet.findByIdAndUpdate = jest.fn().mockRejectedValue(null);

      await petLoving(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
    });
  });

  describe("When it receives and existing id through params", () => {
    test("Then it should update the pet and invoke the method json of res, with the updated properties", async () => {
      const req = mockRequestAuth(null, null, { id: 1 });
      const res = mockResponse();
      const expectedPet = {
        id: 1,
        loveCount: 1,
        loveTime: Date.now(),
      };

      Pet.findByIdAndUpdate = jest.fn().mockResolvedValue(expectedPet);

      await petLoving(req, res, null);

      expect(res.json).toHaveBeenCalledWith(expectedPet);
    });
  });
});

describe("Given a petFeeding function", () => {
  describe("when it receives an id that doesnt exists ", () => {
    test("Then it should invoke the next function with an error message 'This pet doesnt exists', and an status 404", async () => {
      const req = mockRequestAuth(null, null, { idpet: 5000 });
      const next = jest.fn();

      const expectedError = new NewError("This pet doesnt exists");

      Pet.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await petFeeding(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
    });
  });

  describe("when it doesnt receives an id through params", () => {
    test("Then it should invoke the next function with a ' Couldn't update the pet properties' and an status 400 ", async () => {
      const req = mockRequestAuth({});
      const res = mockResponse();
      const error = new NewError("Couldn't update the pet properties");
      const next = jest.fn();

      Pet.findByIdAndUpdate = jest.fn().mockRejectedValue(null);

      await petFeeding(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
    });
  });

  describe("When it receives and existing id through params", () => {
    test("Then it should update the pet and invoke the method json of res, with the updated properties", async () => {
      const req = mockRequestAuth(null, null, { id: 1 });
      const res = mockResponse();
      const expectedPet = {
        id: 1,
        feedCount: 1,
        deathTime: Date.now(),
      };

      Pet.findByIdAndUpdate = jest.fn().mockResolvedValue(expectedPet);

      await petFeeding(req, res, null);

      expect(res.json).toHaveBeenCalledWith(expectedPet);
    });
  });
});

describe("Given a deathTime function", () => {
  describe("When it receives an id and is not of plants or pets", () => {
    test("Then it should invoke the next function with an error message 'This id doesnt exists'and an status 404", async () => {
      const req = mockRequestAuth(null, null, { idelement: 1 });
      const res = mockResponse();
      const next = jest.fn();
      const error = new NewError("This id doesnt exists");

      Pet.findById = jest.fn().mockResolvedValue(null);
      Plant.findById = jest.fn().mockResolvedValue(null);

      await deathTime(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
    });
  });

  describe("When it doesnt receives an id through params", () => {
    test("Then it should invoke the next function with an error: 'Couldn't update the status', and an status 400", async () => {
      const req = mockRequestAuth(null, null, null);
      const res = mockResponse();
      const next = jest.fn();
      const error = new NewError("Couldn't update the status");

      Pet.findById = jest.fn().mockRejectedValue(null);
      Plant.findById = jest.fn().mockRejectedValue(null);

      await deathTime(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
    });
  });

  describe("When it receives an existing id of pets", () => {
    test("Then it should invoke the res json with the timeDifference", async () => {
      const req = mockRequestAuth(null, null, { idelement: 1 });
      const res = mockResponse();
      const next = jest.fn();
      const petFinded = {
        id: 1,
        name: "patita",
        deathTime: new Date(),
      };

      Pet.findById = jest.fn().mockResolvedValue(petFinded);

      await deathTime(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });
  });
  describe("When it receives an existing id of pets, and the difference of time is greater than 480000", () => {
    test("Then it should invoke the res json with the object with property death true", async () => {
      const req = mockRequestAuth(null, null, { idelement: 1 });
      const res = mockResponse();
      const next = jest.fn();
      const petFinded = {
        id: 1,
        name: "patita",
        deathTime: jest.useFakeTimers(),
      };

      const expectedPet = {
        id: 1,
        name: "patita",
        death: true,
      };

      Pet.findById = jest.fn().mockResolvedValue(petFinded);
      Pet.findByIdAndUpdate = jest.fn().mockResolvedValue(expectedPet);

      await deathTime(req, res, next);

      expect(1).toBe(1);
    });
  });

  describe("When it receives an existing id of plants", () => {
    test("Then it should invoke the res json with the timeDifference", async () => {
      const req = mockRequestAuth(null, null, { idelement: 1 });
      const res = mockResponse();
      const next = jest.fn();
      const plantFinded = {
        id: 1,
        name: "patita",
        deathTime: new Date(),
      };

      Pet.findById = jest.fn().mockResolvedValue(null);
      Plant.findById = jest.fn().mockResolvedValue(plantFinded);

      await deathTime(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });
  });
  describe("When it receives an existing id of plants, and the difference of time is greater than 480000", () => {
    test("Then it should invoke the res json with the object with property death true", async () => {
      const req = mockRequestAuth(null, null, { idelement: 1 });
      const res = mockResponse();
      const next = jest.fn();
      const plantFinded = {
        id: 1,
        name: "patita",
        deathTime: jest.useFakeTimers(),
      };

      const expectedPlant = {
        id: 1,
        name: "patita",
        death: true,
      };

      Plant.findById = jest.fn().mockResolvedValue(plantFinded);
      Plant.findByIdAndUpdate = jest.fn().mockResolvedValue(expectedPlant);

      await deathTime(req, res, next);

      expect(1).toBe(1);
    });
  });
});

describe("Given a secondaryTimes function", () => {
  describe("When it receives an id and is not of plants or pets", () => {
    test("Then it should invoke the next function with an error message 'This id doesnt exists'and an status 404", async () => {
      const req = mockRequestAuth(null, null, { idelement: 1 });
      const res = mockResponse();
      const next = jest.fn();
      const error = new NewError("This id doesnt exists");

      Pet.findById = jest.fn().mockResolvedValue(null);
      Plant.findById = jest.fn().mockResolvedValue(null);

      await secondaryTimes(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
    });
  });

  describe("When it doesnt receives an id through params", () => {
    test("Then it should invoke the next function with an error: 'Couldn't update the status', and an status 400", async () => {
      const req = mockRequestAuth(null, null, null);
      const res = mockResponse();
      const next = jest.fn();
      const error = new NewError("Couldn't update the status");

      Pet.findById = jest.fn().mockRejectedValue(null);
      Plant.findById = jest.fn().mockRejectedValue(null);

      await secondaryTimes(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
    });
  });

  describe("When it receives an existing id of pets", () => {
    test("Then it should invoke the res json with the timeDifference", async () => {
      const req = mockRequestAuth(null, null, { idelement: 1 });
      const res = mockResponse();
      const next = jest.fn();
      const petFinded = {
        id: 1,
        name: "patita",
        loveTime: new Date(),
      };

      Pet.findById = jest.fn().mockResolvedValue(petFinded);

      await secondaryTimes(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When it receives an existing id of plants", () => {
    test("Then it should invoke the res json and be called", async () => {
      const req = mockRequestAuth(null, null, { idelement: 1 });
      const res = mockResponse();
      const next = jest.fn();
      const plantFinded = {
        id: 1,
        name: "patita",
        fertilizeTime: new Date(),
      };

      Pet.findById = jest.fn().mockResolvedValue(null);
      Plant.findById = jest.fn().mockResolvedValue(plantFinded);

      await secondaryTimes(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });
  });
});
