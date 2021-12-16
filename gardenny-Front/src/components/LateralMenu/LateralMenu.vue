<template>
  <CreatePlantForm v-if="createPlantModal" />
  <CreatePetForm v-if="createPetModal" />
  <Tutorial v-if="tutorialModal" />
  <div
    class="menu"
    v-if="
      !plantModal &&
      !petModal &&
      !createPlantModal &&
      !createPetModal &&
      !tutorialModal
    "
  >
    <div class="menu__userInfo">
      <div class="menu__userInfo--userImage"></div>
      <p class="menu__userInfo--user-name">
        {{ this.currentUser.username }}
      </p>
    </div>
    <div class="menu__newPlant">
      <button class="menu__newPlant--button" @click="createPlant">
        New Plant
      </button>
    </div>
    <div class="menu__newPet">
      <button class="menu__newPet--button" @click="createPet">New Pet</button>
    </div>
    <div class="menu__tutorial">
      <button class="menu__tutorial--button" @click="openTutorial">
        Tutorial
      </button>
    </div>
    <div class="menu__logout">
      <button
        class="menu__logout--button"
        @click="onLogout"
        aria-label="logout-button"
      >
        <font-awesome-icon
          icon="door-open"
          class="menu__logout--icon-logout"
        ></font-awesome-icon>
      </button>
    </div>
  </div>
  <div v-else class="menu__userCircle">
    <div class="menu__userCircle--userImage2"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import CreatePlantForm from "@/components/CreatePlantForm/CreatePlantForm.vue";
import CreatePetForm from "@/components/CreatePetForm/CreatePetForm.vue";
import Tutorial from "@/components/Tutorial/Tutorial.vue";

export default defineComponent({
  name: "LateralMenu",
  components: {
    CreatePlantForm,
    CreatePetForm,
    Tutorial,
  },
  data() {
    return {};
  },

  computed: {
    ...mapState([
      "plantModal",
      "petModal",
      "createPlantModal",
      "createPetModal",
      "currentUser",
      "tutorialModal",
    ]),
  },
  methods: {
    ...mapActions([
      "activateCreatePlantModalAction",
      "activateCreatePetModalAction",
      "activateTutorialAction",
      "userLogout",
    ]),

    createPlant() {
      this.activateCreatePlantModalAction();
    },
    createPet() {
      this.activateCreatePetModalAction();
    },
    onLogout() {
      this.userLogout();
    },
    openTutorial() {
      this.activateTutorialAction();
    },
  },
});
</script>

<style lang="scss">
@import "../../styles/_variables.scss";

.menu {
  width: 160px;
  height: 98vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: AmaticBold, sans-serif;
  background-color: $pink;
  border-top-right-radius: 20px 20px;
  border-bottom-right-radius: 20px 20px;
  border: 4px solid $violet;
  &__userCircle {
    background-color: $pink;
    width: 84px;
    height: 82px;
    border-radius: 50%;
    position: relative;
    &--userImage2 {
      margin-left: 8px;
      margin-top: 10px;
      width: 65px;
      height: 60px;
      border: 1px solid;
      border-radius: 50%;
      background-image: url("../../assets/bongocat.png");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      background-color: white;
    }
  }
  &__userInfo {
    &--userImage {
      width: 65px;
      height: 60px;
      margin-top: 10px;
      border: 1px solid;
      border-radius: 50%;
      background-image: url("../../assets/bongocat.png");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      background-color: white;
    }
    &--user-name {
      margin-top: 5px;
      text-align: center;
      font-size: 24px;
    }
  }
  &__newPlant {
    &--button {
      font-family: AmaticBold, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
        sans-serif;
      font-size: 24px;
      width: 105px;
      height: 45px;
      margin-top: 12px;
      border-radius: 20px;
      background-color: $softGreen;
      border: 4px solid $green;
      box-shadow: rgba(35, 192, 43, 0.8) 0px 2px 4px,
        rgba(35, 194, 43, 0.8) 0px 7px 13px -3px;

      &:active {
        width: 102px;
        height: 42px;
        box-shadow: none;
      }
      &:target {
        width: 95px;
        height: 38px;
        box-shadow: none;
      }
    }
  }
  &__newPet {
    &--button {
      font-family: AmaticBold, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
        sans-serif;
      font-size: 24px;
      width: 105px;
      height: 45px;
      margin-top: 17px;
      border-radius: 20px;
      background-color: $orange;
      border: 4px solid $darkOrange;
      box-shadow: rgba(182, 90, 4, 0.8) 0px 2px 4px,
        rgba(170, 88, 11, 0.8) 0px 7px 13px -3px;

      &:active {
        width: 102px;
        height: 42px;
        box-shadow: none;
      }
      &:target {
        width: 95px;
        height: 38px;
        box-shadow: none;
      }
    }
  }

  &__tutorial {
    &--button {
      font-family: AmaticBold, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
        sans-serif;
      font-size: 24px;
      width: 105px;
      height: 45px;
      margin-top: 17px;
      border-radius: 20px;
      background-color: $blue;
      border: 4px solid $darkBlue;

      box-shadow: rgba(23, 129, 228, 0.8) 0px 2px 4px,
        rgba(35, 130, 194, 0.8) 0px 7px 13px -3px;

      &:active {
        width: 102px;
        height: 42px;
        box-shadow: none;
      }
      &:target {
        width: 95px;
        height: 38px;
        box-shadow: none;
      }
    }
  }

  &__logout {
    &--button {
      font-family: Amatic, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-size: 24px;
      width: 61px;
      height: 37px;
      margin-top: 17px;
      border-radius: 20px;
      background-color: $red;
      border: 4px solid $darkRed;

      box-shadow: rgba(228, 23, 40, 0.8) 0px 2px 4px,
        rgba(194, 35, 43, 0.8) 0px 7px 13px -3px;

      &:active {
        width: 102px;
        height: 42px;
        box-shadow: none;
      }
      &:target {
        width: 95px;
        height: 38px;
        box-shadow: none;
      }
    }
    &--icon-logout {
      color: white;
      font-size: 22px;
      padding-bottom: 2px;
    }
  }
}

@media (min-width: 801px) {
  .menu {
    width: 260px;
    height: 100vh;
    &__userCircle {
      width: 135px;
      height: 128px;
      &--userImage2 {
        width: 115px;
        height: 105px;
      }
    }
    &__userInfo {
      &--userImage {
        width: 135px;
        height: 130px;
      }
      &--user-name {
        margin-top: 10px;
        font-size: 42px;
      }
    }
    &__newPlant {
      &--button {
        font-size: 36px;
        width: 205px;
        height: 75px;
        margin-top: 40px;
        border-radius: 50px;

        &:active {
          width: 200px;
          height: 62px;
          box-shadow: none;
        }
        &:target {
          width: 200px;
          height: 62px;
          box-shadow: none;
        }
      }
    }
    &__newPet {
      &--button {
        font-size: 36px;
        width: 205px;
        height: 75px;
        margin-top: 40px;
        border-radius: 50px;
        &:active {
          width: 202px;
          height: 62px;
          box-shadow: none;
        }
        &:target {
          width: 205px;
          height: 68px;
          box-shadow: none;
        }
      }
    }

    &__tutorial {
      &--button {
        font-size: 36px;
        width: 205px;
        height: 75px;
        margin-top: 40px;
        border-radius: 50px;
        &:active {
          width: 202px;
          height: 62px;
          box-shadow: none;
        }
        &:target {
          width: 205px;
          height: 68px;
          box-shadow: none;
        }
      }
    }

    &__logout {
      &--button {
        width: 100px;
        height: 67px;
        margin-top: 40px;
        border-radius: 30px;

        &:active {
          width: 102px;
          height: 42px;
          box-shadow: none;
        }
        &:target {
          width: 95px;
          height: 38px;
          box-shadow: none;
        }
      }
      &--icon-logout {
        font-size: 36px;
      }
    }
  }
}
</style>
