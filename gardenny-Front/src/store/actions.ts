import axios from "axios";
import { ActionContext } from "vuex";

import {
  createPlant,
  paramsGrow,
  Pets,
  State,
  UserLogin,
  UserRegister,
} from "@/types/interface";
import router from "@/router";

const urlApiGardenny = process.env.VUE_APP_GARDENNY_API;

const actions = {
  async userLogin(
    { dispatch }: ActionContext<State, State>,
    user: UserLogin
  ): Promise<void> {
    const { data: token } = await axios.post(`${urlApiGardenny}/login`, user);

    localStorage.setItem("user", JSON.stringify(token.token));

    dispatch("getUser", token);
  },

  async userRegisterAction(
    { dispatch }: ActionContext<State, State>,
    user: UserRegister
  ): Promise<void | string> {
    try {
      const response = await axios.post(`${urlApiGardenny}/register`, user);
      if (response.status === 200) {
        router.push("/login");
        dispatch("userLogout");
      }
      return "";
    } catch {
      return "Couldnt register";
    }
  },

  tokenSearch({ dispatch }: ActionContext<State, State>): void {
    const token = JSON.parse(localStorage.getItem("user") || "");
    dispatch("getUser", token);
  },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  userLogout({ commit }: ActionContext<State, State>) {
    router.push("/login");
    localStorage.removeItem("user");
    return commit("LOGOUT_USER");
  },

  async getUser({
    commit,
    dispatch,
  }: ActionContext<State, State>): Promise<void> {
    const token = JSON.parse(localStorage.getItem("user") || "");

    const { data: userData, status } = await axios.get(
      `${urlApiGardenny}/mygarden/user`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (status === 401) {
      dispatch("userLogout");
    }
    const user = {
      id: userData.id,
      username: userData.username,
      myPlants: userData.myPlants,
      myPets: userData.myPets,
      myFriends: userData.myFriends,
      avatar: userData.avatar,
    };

    commit("LOAD_USER", user);
    commit("LOGIN_USER");
    commit("LOAD_MY_PLANTS", userData.myPlants);
    commit("LOAD_MY_PETS", userData.myPets);
    commit("LOAD_MY_FRIENDS", userData.myFriends);
  },

  isLoadingAction({ commit }: ActionContext<State, State>): void {
    commit("ACTIVATE_IS_LOADING");
  },

  activatePlantModalAction({ commit }: ActionContext<State, State>): void {
    commit("ACTIVATE_PLANT_MODAL");
  },
  activatePetModalAction({ commit }: ActionContext<State, State>): void {
    commit("ACTIVATE_PET_MODAL");
  },

  activateTutorialAction({ commit }: ActionContext<State, State>): void {
    commit("ACTIVATE_TUTORIAL_MODAL");
  },

  activateCreatePlantModalAction({
    commit,
  }: ActionContext<State, State>): void {
    commit("ACTIVATE_CREATE_PLANT_MODAL");
  },

  activateCreatePetModalAction({ commit }: ActionContext<State, State>): void {
    commit("ACTIVATE_CREATE_PET_MODAL");
  },

  async createNewPlantAction(
    { commit }: ActionContext<State, State>,
    plant: createPlant
  ): Promise<void | string> {
    const token = JSON.parse(localStorage.getItem("user") || "");

    const { data: newPlant } = await axios.post(
      `${urlApiGardenny}/mygarden/createplant`,
      plant,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    commit("CREATE_NEW_PLANT", newPlant);
  },

  async createNewPetAction(
    { commit }: ActionContext<State, State>,
    pet: Pets
  ): Promise<void | string> {
    const token = JSON.parse(localStorage.getItem("user") || "");

    const { data: newPet } = await axios.post(
      `${urlApiGardenny}/mygarden/createpet`,
      pet,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    commit("CREATE_NEW_PET", newPet);
  },

  async deletePlantAction(
    { dispatch }: ActionContext<State, State>,
    params: string
  ): Promise<string | void> {
    try {
      const token = JSON.parse(localStorage.getItem("user") || "");

      await axios.delete(`${urlApiGardenny}/mygarden/deleteplant/${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return dispatch("getUser");
    } catch {
      return "Couldn't Delete this plant";
    }
  },

  async deletePetAction(
    { dispatch }: ActionContext<State, State>,
    params: string
  ): Promise<string | void> {
    try {
      const token = JSON.parse(localStorage.getItem("user") || "");

      await axios.delete(`${urlApiGardenny}/mygarden/deletepet/${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return dispatch("getUser");
    } catch {
      return "Couldn't Delete this pet";
    }
  },

  async wateringPlantAction(
    { dispatch }: ActionContext<State, State>,
    params: string
  ): Promise<string | void> {
    const token = JSON.parse(localStorage.getItem("user") || "");

    await axios({
      method: "PATCH",
      url: `${urlApiGardenny}/mygarden/wateringplant/${params}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return dispatch("getUser");
  },

  async fertilizingPlantAction(
    { dispatch }: ActionContext<State, State>,
    plantId: string
  ): Promise<void | string> {
    const token = JSON.parse(localStorage.getItem("user") || "");

    await axios({
      method: "PATCH",
      url: `${urlApiGardenny}/mygarden/fertilizingplant/${plantId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return dispatch("getUser");
  },

  async lovingPetAction(
    { dispatch }: ActionContext<State, State>,
    petId: string
  ): Promise<void | string> {
    const token = JSON.parse(localStorage.getItem("user") || "");

    await axios({
      method: "PATCH",
      url: `${urlApiGardenny}/mygarden/lovingpet/${petId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return dispatch("getUser");
  },

  async feedingPetAction(
    { dispatch }: ActionContext<State, State>,
    petId: string
  ): Promise<void> {
    const token = JSON.parse(localStorage.getItem("user") || "");

    await axios({
      method: "PATCH",
      url: `${urlApiGardenny}/mygarden/feedingpet/${petId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return dispatch("getUser");
  },

  async growingPet(
    { commit, dispatch }: ActionContext<State, State>,
    params: paramsGrow
  ): Promise<void | string> {
    commit("ACTIVATE_IS_LOADING");
    const token = JSON.parse(localStorage.getItem("user") || "");

    await axios({
      method: "PATCH",
      url: `${urlApiGardenny}/mygarden/petgrow/${params.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        newImage: params.image,
      },
    });
    commit("ACTIVATE_IS_LOADING");
    return dispatch("getUser");
  },

  async growingPlant(
    { dispatch }: ActionContext<State, State>,
    params: paramsGrow
  ): Promise<void | string> {
    const token = JSON.parse(localStorage.getItem("user") || "");

    await axios({
      method: "PATCH",
      url: `${urlApiGardenny}/mygarden/plantgrow/${params.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        newImage: params.image,
      },
    });
    return dispatch("getUser");
  },

  async checkDeathAction(
    { dispatch }: ActionContext<State, State>,
    param: string
  ): Promise<void | string> {
    const token = JSON.parse(localStorage.getItem("user") || "");

    const response = await axios({
      method: "PATCH",
      url: `${urlApiGardenny}/mygarden/lifeStatus/${param}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 404) {
      return "couldnt find id";
    }

    dispatch("getUser");
    return response.data;
  },

  async checkFertilizeTimeAction(
    { dispatch }: ActionContext<State, State>,
    plantId: string
  ): Promise<void | string> {
    const token = JSON.parse(localStorage.getItem("user") || "");

    await axios({
      method: "GET",
      url: `${urlApiGardenny}/mygarden/secondarystats/${plantId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return dispatch("getUser");
  },

  async checkLoveTimeAction(
    { dispatch }: ActionContext<State, State>,
    petId: string
  ): Promise<void | string> {
    const token = JSON.parse(localStorage.getItem("user") || "");

    await axios({
      method: "GET",
      url: `${urlApiGardenny}/mygarden/secondarystats/${petId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return dispatch("getUser");
  },
};

export default actions;
