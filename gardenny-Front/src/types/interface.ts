export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRegister {
  name: string;
  username: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  avatar: string;
  myPlants: Array<string>;
  myPets: Array<string>;
  myFriends: Array<string>;
}

export interface Plants {
  name: string;
  image: string;
  waterCount: number;
  fertilizeCount: number;
  death: boolean;
  deathTime: Date;
  fertilizeTime: Date;
}

export interface createPlant {
  name: string;
  image: string;
  deathTime: Date;
  fertilizeTime: Date;
}

export interface createPet {
  name: string;
  image: string;
  deathTime: Date;
  lovingTime: Date;
}

export interface Pets {
  name: string;
  image: string;
  loveCount: number;
  feedCount: number;
  death: boolean;
  deathTime: Date;
  loveTime: Date;
}

export interface State {
  currentUser: User;
  myPlants: Array<Plants> | [];
  myPets: Array<Pets> | [];
  myFriends: Array<User> | [];
  isAuthenticated: boolean;
  plantModal: boolean;
  petModal: boolean;
  createPlantModal: boolean;
  createPetModal: boolean;
  tutorialModal: boolean;
  isLoading: boolean;
}

export interface paramsGrow {
  id: string;
  image: string;
}
