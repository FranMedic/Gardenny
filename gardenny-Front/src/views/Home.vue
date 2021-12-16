<template>
  <div id="warning-message">
    <font-awesome-icon icon="sync-alt" class="icon-turn"></font-awesome-icon>
    <p class="text-warning">this website is only viewable in landscape mode</p>
  </div>
  <div id="wrapper">
    <MyPlantsList v-if="plantModal" />
    <MyPetsList v-if="petModal" />

    <div class="home">
      <Header />
      <LateralMenu />

      <div
        class="buttons"
        v-if="!plantModal && !petModal && !createPlantModal && !createPetModal"
      >
        <div class="buttons_myGardenButton">
          <div class="buttons__myGardenButton--outerCircle">
            <div class="buttons__myGardenButton--innerCircle">
              <button
                class="buttons__myGardenButton--button"
                @click="activatePlantModal"
              >
                My Garden
              </button>
            </div>
          </div>
        </div>
        <div class="buttons__myPetsButton">
          <div class="buttons__myPetsButton--outerCircle">
            <div class="buttons__myPetsButton--innerCircle">
              <button
                class="buttons__myPetsButton--button"
                @click="activatePetModal"
              >
                My Pets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" scoped>
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import LateralMenu from "@/components/LateralMenu/LateralMenu.vue";
import MyPlantsList from "@/components/MyPlantsList/MyPlantsList.vue";
import MyPetsList from "@/components/MyPetsList/MyPetsList.vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "Home",
  components: {
    LateralMenu,
    MyPlantsList,
    MyPetsList,
    Header,
  },

  computed: {
    ...mapState([
      "plantModal",
      "currentUser",
      "petModal",
      "createPlantModal",
      "createPetModal",
    ]),
  },
  methods: {
    ...mapActions([
      "getUser",
      "activatePlantModalAction",
      "activatePetModalAction",
      "activateCreatePlantModalAction",
    ]),

    activatePlantModal() {
      this.activatePlantModalAction();
    },
    activatePetModal() {
      this.activatePetModalAction();
    },
    activateCreatePlantModal() {
      this.activatePlantModal();
    },
  },

  mounted() {
    this.getUser();
  },
});
</script>

<style lang="scss">
@import "../styles/_variables";
#warning-message {
  background-color: $pink;
  width: 100vw;
  height: 100vh;
  display: none;
  .icon-turn {
    position: fixed;
    top: 25%;
    left: 35%;
    color: #ffff;
    font-size: 100px;
  }
  .text-warning {
    top: 40%;
    position: fixed;
    font-size: 40px;

    text-align: center;
    padding: 20px 40px 20px 40px;
  }
}
@media only screen and (orientation: portrait) {
  #wrapper {
    display: none;
  }
  #warning-message {
    display: block;
  }
}
@media only screen and (orientation: landscape) {
  #warning-message {
    display: none;
  }
}

.home {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-image: url("../assets/background-demo-opacity3.png");
  background-size: cover;

  .buttons {
    display: flex;
    width: 100%;
    position: fixed;
    bottom: 20px;
    left: 80px;
    justify-content: space-evenly;

    &__myGardenButton {
      &--outerCircle {
        width: 145px;
        height: 145px;
        position: relative;
        border: 3px solid white;
        border-radius: 50%;

        &:hover {
          transform: scale(1.1);
          .buttons__myGardenButton--innerCircle {
            transform: scale(0.9);
          }
          .buttons__myGardenButton--button {
            transform: scale(1.5);
          }
        }
      }
      &--innerCircle {
        top: calc(50% - 57px);
        left: calc(50% - 57px);
        position: absolute;
        width: 110px;
        height: 110px;
        border: 2px solid white;
        border-radius: 50%;
      }
      &--button {
        font-family: AmaticBold, "Gill Sans", "Gill Sans MT", Calibri,
          "Trebuchet MS", sans-serif;
        font-size: 24px;
        top: calc(50% - 42.5px);
        left: calc(50% - 42.5px);
        border-radius: 50%;
        border: 1px solid white;
        position: absolute;
        width: 85px;
        height: 85px;
        background-color: $darkGreen;
        color: #ffff;
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 5px;
        box-shadow: 0 0 3px 2px #ffff;
      }
    }

    &__myPetsButton {
      &--outerCircle {
        width: 145px;
        height: 145px;
        position: relative;
        border: 3px solid white;
        border-radius: 50%;
        &:hover {
          transform: scale(1.1);
          .buttons__myPetsButton--innerCircle {
            transform: scale(0.9);
          }
          .buttons__myPetsButton--button {
            transform: scale(1.5);
          }
        }
      }
      &--innerCircle {
        top: calc(50% - 57px);
        left: calc(50% - 57px);
        position: absolute;
        width: 110px;
        height: 110px;
        border: 2px solid white;
        border-radius: 50%;
      }
      &--button {
        font-family: AmaticBold, "Gill Sans", "Gill Sans MT", Calibri,
          "Trebuchet MS", sans-serif;
        font-size: 27px;
        top: calc(50% - 42.5px);
        left: calc(50% - 42.5px);
        border-radius: 50%;
        border: 1px solid white;
        position: absolute;
        width: 85px;
        height: 85px;
        background-color: $orange;
        color: #ffff;
        padding-left: 5px;
        padding-right: 5px;
        padding-bottom: 5px;
        box-shadow: 0 0 3px 2px #ffff;
      }
    }
  }
}
</style>
