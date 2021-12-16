import axios from "axios";

import { Commit, Dispatch } from "vuex";
import {
  configActionContext,
  configActionContextAndDispatch,
  configActionContextDispatch,
} from "../test-utils";
import actions from "@/store/actions";

import {
  createPet,
  createPlant,
  paramsGrow,
  Pets,
  User,
  UserRegister,
} from "@/types/interface";

jest.mock("axios");
jest.mock("jwt-decode", () => () => ({}));
let mockedAxios = axios as jest.Mocked<typeof axios>;
let commit = jest.fn() as jest.MockedFunction<Commit>;
let dispatch = jest.fn() as jest.MockedFunction<Dispatch>;
beforeEach(() => {
  mockedAxios = axios as jest.Mocked<typeof axios>;
  commit = jest.fn() as jest.MockedFunction<Commit>;
  dispatch = jest.fn() as jest.MockedFunction<Dispatch>;
});
describe("Given a userLogin action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit", async () => {
      const user = {} as User;

      const data = {
        token: "123",
      };

      mockedAxios.post.mockResolvedValue({ data });
      await actions.userLogin(configActionContextDispatch(dispatch), user);
      expect(dispatch).toHaveBeenCalledWith("getUser", data);
    });
  });
});

describe("given a userRegisterAction action", () => {
  describe("when the action is invoked", () => {
    test("then it should call dispatch", async () => {
      const response = { status: 200 };

      const userRegister = {} as UserRegister;
      mockedAxios.post.mockResolvedValue(response);
      await actions.userRegisterAction(
        configActionContextDispatch(dispatch),
        userRegister
      );
      expect(dispatch).toHaveBeenCalledWith("userLogout");
    });
  });
  describe("when the action is invoked and rejected", () => {
    test("then should return a message", async () => {
      const userRegister = {} as UserRegister;
      mockedAxios.post.mockRejectedValue({});
      await actions.userRegisterAction(
        configActionContextDispatch(dispatch),
        userRegister
      );
      expect(dispatch).not.toHaveBeenCalled();
    });
  });
});

describe("given a userLogout action", () => {
  describe("when the action is invoked", () => {
    test("then it should call commit", async () => {
      await actions.userLogout(configActionContext(commit));
      expect(commit).toHaveBeenCalledWith("LOGOUT_USER");
    });
  });
});

describe("Given a tokenSearch", () => {
  describe("when the action is invoket", () => {
    test("then it should call dispatch", async () => {
      JSON.parse = jest.fn().mockResolvedValue("12345");
      await actions.tokenSearch(configActionContextDispatch(dispatch));
      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a getUser action", () => {
  describe("when is invoked and has an status 200", () => {
    test("then it should called commit", async () => {
      JSON.parse = jest.fn().mockResolvedValue("12345");
      const data = {
        userData: {
          id: undefined,
          avatar: undefined,
          myFriends: undefined,
          myPets: undefined,
          myPlants: undefined,
          username: undefined,
        },
      };
      const user = {
        id: data.userData.id,
        avatar: data.userData.avatar,
        myFriends: data.userData.myFriends,
        myPets: data.userData.myPets,
        myPlants: data.userData.myPlants,
        username: data.userData.username,
      };

      mockedAxios.get.mockResolvedValue({ data });
      await actions.getUser(configActionContextAndDispatch(commit, dispatch));

      expect(commit).toHaveBeenCalledWith("LOAD_USER", user);
      expect(commit).toHaveBeenCalledWith("LOGIN_USER");
      expect(commit).toHaveBeenCalledWith(
        "LOAD_MY_PLANTS",
        data.userData.myPlants
      );
      expect(commit).toHaveBeenCalledWith("LOAD_MY_PETS", data.userData.myPets);
      expect(commit).toHaveBeenCalledWith(
        "LOAD_MY_FRIENDS",
        data.userData.myFriends
      );
    });
  });
});

describe("Given an activatePlantModalAction", () => {
  describe("When is invoked", () => {
    test("then ist should call commit", async () => {
      await actions.activatePlantModalAction(configActionContext(commit));
      expect(commit).toHaveBeenCalledWith("ACTIVATE_PLANT_MODAL");
    });
  });
});
describe("Given an activatePetModalAction", () => {
  describe("When is invoked", () => {
    test("then ist should call commit", async () => {
      await actions.activatePetModalAction(configActionContext(commit));
      expect(commit).toHaveBeenCalledWith("ACTIVATE_PET_MODAL");
    });
  });
});
describe("Given an activateCreatePlantModalAction", () => {
  describe("When is invoked", () => {
    test("then ist should call commit", async () => {
      await actions.activateCreatePlantModalAction(configActionContext(commit));
      expect(commit).toHaveBeenCalledWith("ACTIVATE_CREATE_PLANT_MODAL");
    });
  });
});

describe("Given an isLoadingAction", () => {
  describe("When is invoked", () => {
    test("then ist should call commit", async () => {
      await actions.isLoadingAction(configActionContext(commit));
      expect(commit).toHaveBeenCalledWith("ACTIVATE_IS_LOADING");
    });
  });
});

describe("Given an activateCreatePetModalAction", () => {
  describe("When is invoked", () => {
    test("then ist should call commit", async () => {
      await actions.activateCreatePetModalAction(configActionContext(commit));
      expect(commit).toHaveBeenCalledWith("ACTIVATE_CREATE_PET_MODAL");
    });
  });
});

describe("Given a createNewPLantAction", () => {
  describe("When is invoked", () => {
    test("then it should call commit", async () => {
      JSON.parse = jest.fn().mockResolvedValue("12345");

      const plant = {} as createPlant;

      const data = {
        newPlant: {} as createPlant,
      };

      mockedAxios.post.mockResolvedValue({ data });
      await actions.createNewPlantAction(configActionContext(commit), plant);

      expect(commit).toHaveBeenCalledWith("CREATE_NEW_PLANT", data);
    });
  });
});

describe("Given a createNewPetAction", () => {
  describe("When is invoked", () => {
    test("then it should call commit", async () => {
      JSON.parse = jest.fn().mockResolvedValue("12345");

      const pet = {} as Pets;

      const data = {
        newPet: {} as createPet,
      };

      mockedAxios.post.mockResolvedValue({ data });
      await actions.createNewPetAction(configActionContext(commit), pet);

      expect(commit).toHaveBeenCalledWith("CREATE_NEW_PET", data);
    });
  });
});

describe("Given a deletePlantAction", () => {
  describe("when is invoked", () => {
    test("then it should call dispatch", async () => {
      JSON.parse = jest.fn().mockResolvedValue("12345");
      const params = "12345";

      await actions.deletePlantAction(
        configActionContextDispatch(dispatch),
        params
      );
      mockedAxios.delete.mockResolvedValue({});

      expect(dispatch).toHaveBeenCalledWith("getUser");
    });
  });
  describe("when is invoked and rejects", () => {
    test("then it should NOT call dispatch", async () => {
      JSON.parse = jest.fn().mockResolvedValue("12345");
      const params = "wroooong";
      mockedAxios.delete.mockRejectedValue({});

      await actions.deletePlantAction(
        configActionContextDispatch(dispatch),
        params
      );

      expect(dispatch).not.toHaveBeenCalledWith("getUser");
    });
  });
});

describe("Given a deletePetAction", () => {
  describe("when is invoked", () => {
    test("then it should call dispatch", async () => {
      JSON.parse = jest.fn().mockResolvedValue("12345");
      const params = "12345";

      mockedAxios.delete.mockResolvedValue({});
      await actions.deletePetAction(
        configActionContextDispatch(dispatch),
        params
      );

      expect(dispatch).toHaveBeenCalledWith("getUser");
    });
  });
});

describe("Given a wateringPlantAction", () => {
  describe("When is invoked", () => {
    test("then it should call dispatch", async () => {
      JSON.parse = jest.fn().mockResolvedValue("12345");
      const params = "12345";

      mockedAxios.patch.mockResolvedValue({});

      await actions.wateringPlantAction(
        configActionContextDispatch(dispatch),
        params
      );

      expect(dispatch).toHaveBeenCalledWith("getUser");
    });
  });
});

describe("Given a fertilizingPlantAction", () => {
  describe("When is invoked", () => {
    test("then it should call dispatch", async () => {
      JSON.parse = jest.fn().mockResolvedValue("12345");
      const params = "12345";

      mockedAxios.patch.mockResolvedValue({});

      await actions.fertilizingPlantAction(
        configActionContextDispatch(dispatch),
        params
      );

      expect(dispatch).toHaveBeenCalledWith("getUser");
    });
  });
});

describe("Given a lovingPetAction", () => {
  describe("When is invoked", () => {
    test("then it should call dispatch", async () => {
      JSON.parse = jest.fn().mockResolvedValue("12345");
      const petId = "12345";

      mockedAxios.patch.mockResolvedValue({});

      await actions.lovingPetAction(
        configActionContextDispatch(dispatch),
        petId
      );

      expect(dispatch).toHaveBeenCalledWith("getUser");
    });
  });
});

describe("Given a feedingPetAction", () => {
  describe("When is invoked", () => {
    test("then it should call dispatch", async () => {
      JSON.parse = jest.fn().mockResolvedValue("12345");
      const petId = "12345";

      await actions.feedingPetAction(
        configActionContextDispatch(dispatch),
        petId
      );
      mockedAxios.patch.mockResolvedValue({});

      expect(dispatch).toHaveBeenCalledWith("getUser");
    });
  });
});

describe("Given a growingPet action", () => {
  describe("When is invoked", () => {
    test("then it should call dispatch", async () => {
      JSON.parse = jest.fn().mockResolvedValue("12345");
      const params: paramsGrow = {
        id: "12345",
        image: "patata",
      };

      await actions.growingPet(configActionContextDispatch(dispatch), params);

      mockedAxios.patch.mockResolvedValue({});
      expect(dispatch).toHaveBeenCalledWith("getUser");
    });
  });
});

describe("Given a growingPlant action", () => {
  describe("When is invoked", () => {
    test("then it should call dispatch", async () => {
      JSON.parse = jest.fn().mockResolvedValue("12345");
      const params: paramsGrow = {
        id: "12345",
        image: "patata",
      };

      await actions.growingPlant(configActionContextDispatch(dispatch), params);

      mockedAxios.patch.mockResolvedValue({});
      expect(dispatch).toHaveBeenCalledWith("getUser");
    });
  });
});

describe("Given a checkDeathAction action", () => {
  describe("When is invoked", () => {
    test("then it should call dispatch", async () => {
      JSON.parse = jest.fn().mockResolvedValue("12345");
      const param = "12345";
      // eslint-disable-next-line no-restricted-globals
      const getData = { data: {} };
      const status = 200;
      const response = { getData, status };
      mockedAxios.patch.mockResolvedValue(response);
      await actions.checkDeathAction(
        configActionContextDispatch(dispatch),
        param
      );

      expect(dispatch).toHaveBeenCalledWith("getUser");
    });
  });
});

describe("Given a checkFertilizeTimeAction action", () => {
  describe("When is invoked", () => {
    test("then it should call dispatch", async () => {
      JSON.parse = jest.fn().mockResolvedValue("12345");
      const plantId = "12345";

      await actions.checkFertilizeTimeAction(
        configActionContextDispatch(dispatch),
        plantId
      );
      mockedAxios.get.mockResolvedValue({});

      expect(dispatch).toHaveBeenCalledWith("getUser");
    });
  });
});

describe("Given a checkLoveTimeAction action", () => {
  describe("When is invoked", () => {
    test("then it should call dispatch", async () => {
      JSON.parse = jest.fn().mockResolvedValue("12345");
      const petId = "12345";

      await actions.checkLoveTimeAction(
        configActionContextDispatch(dispatch),
        petId
      );
      mockedAxios.get.mockResolvedValue({});

      expect(dispatch).toHaveBeenCalledWith("getUser");
    });
  });
});
