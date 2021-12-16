import { State } from "@/types/interface";

const state = {
  isAuthenticated: false,
  currentUser: {},
  myPlants: [],
  myPets: [],
  myFriends: [],
  plantModal: false,
  petModal: false,
  createPlantModal: false,
  createPetModal: false,
  tutorialModal: false,
  isLoading: false,
};

export default state as unknown as State;
