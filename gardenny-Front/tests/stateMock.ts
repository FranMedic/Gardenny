import { State } from "@/types/interface";

const stateMock = {
  myPlants: [
    {
      name: "",
      image: "plantita foto",
      waterCount: 3,
      fertilizeCount: 3,
      death: false,
      deathTime: "2021-12-10",
      fertilizeTime: "2021-12-12",
      id: 1,
    },
  ],
  myPets: [
    {
      name: "animalito name",
      image: "animalito foto",
      waterCount: 5,
      fertilizeCount: 2,
      death: false,
      deathTime: "2021-12-10",
      fertilizeTime: "2021-12-12",
      id: 1,
    },
  ],
  currentUser: {
    name: "franny",
    username: "franny username",
    password: "franny password hash",
    avatar: "franny avatar",
    myPlants: [
      {
        name: "plantita name",
        image: "plantita foto",
        waterCount: 3,
        fertilizeCount: 3,
        death: false,
        deathTime: "2021-12-10",
        fertilizeTime: "2021-12-12",
        id: 1,
      },
    ],
    myPets: [
      {
        name: "animalito name",
        image: "animalito foto",
        waterCount: 5,
        fertilizeCount: 2,
        death: false,
        deathTime: "2021-12-10",
        fertilizeTime: "2021-12-12",
        id: 1,
      },
    ],
    myFriends: [],
  },
  isAuthenticated: true,
  myFriends: [],
};

export default stateMock as unknown as State;
