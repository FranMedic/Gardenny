import { Pets, Plants, State, User } from "@/types/interface";

const mutations = {
  LOAD_USER(state: State, payload: User): void {
    state.currentUser = payload;
  },
  LOGIN_USER(state: State): void {
    state.isAuthenticated = true;
  },
  LOGOUT_USER(state: State): void {
    state.isAuthenticated = false;
    state.currentUser = {} as User;
    state.myPets = [];
    state.myFriends = [];
    state.myPlants = [];
  },
  LOAD_MY_PLANTS(state: State, payload: Array<Plants>): void {
    state.myPlants = payload;
  },
  LOAD_MY_PETS(state: State, payload: Array<Pets>): void {
    state.myPets = payload;
  },
  LOAD_MY_FRIENDS(state: State, payload: Array<User>): void {
    state.myFriends = payload;
  },
  ACTIVATE_PLANT_MODAL(state: State): void {
    state.plantModal = !state.plantModal;
  },
  ACTIVATE_PET_MODAL(state: State): void {
    state.petModal = !state.petModal;
  },

  ACTIVATE_TUTORIAL_MODAL(state: State): void {
    state.tutorialModal = !state.tutorialModal;
  },
  ACTIVATE_CREATE_PLANT_MODAL(state: State): void {
    state.createPlantModal = !state.createPlantModal;
  },
  ACTIVATE_CREATE_PET_MODAL(state: State): void {
    state.createPetModal = !state.createPetModal;
  },
  CREATE_NEW_PET(state: State, payload: Pets): void {
    state.myPets = [...state.myPets, payload];
  },
  CREATE_NEW_PLANT(state: State, payload: Plants): void {
    state.myPlants = [...state.myPlants, payload];
  },

  ACTIVATE_IS_LOADING(state: State): void {
    state.isLoading = !state.isLoading;
  },
};

export default mutations;
