<template>
  <div class="plant-card">
    <div class="plant-card__image">
      <Loading v-if="this.isLoading && this.growing" />
      <img v-else :src="image" alt="pixel-art plant" />
    </div>
    <div class="plant-card__info">
      <div class="plant-card__title">
        <h2>{{ name }}</h2>
      </div>
      <div class="plant-card__info--lifes">
        <div
          class="firstHeart"
          :class="this.hearts >= 1 ? 'fullheart' : 'emptyHeart'"
        ></div>
        <div
          class="secondHeart"
          :class="this.hearts >= 2 ? 'fullheart' : 'emptyHeart'"
        ></div>
        <div
          class="thirdHeart"
          :class="this.hearts >= 3 ? 'fullheart' : 'emptyHeart'"
        ></div>
        <div
          class="fourthHeart"
          :class="this.hearts === 4 ? 'fullheart' : 'emptyHeart'"
        ></div>
      </div>
    </div>
    <div class="plant-card__lifes"></div>
    <div class="plant-card__buttons">
      <div class="plant-card__buttons--water">
        <button
          class="water-button"
          @click="waterPlant"
          :class="this.disabledWater ? 'disabled-water' : ''"
          :disabled="this.disabledWater"
        >
          Watering
        </button>
      </div>
      <div class="plant-card__buttons--fertilize">
        <button
          class="fertilize-button"
          @click="fertilizePlant"
          :class="this.disabledFertilize ? 'disabled-fertilize' : ''"
          :disabled="this.disabledFertilize"
        >
          Fertilize
        </button>
      </div>
    </div>
    <button type="button" class="delete-button" @click="onDelete">
      <font-awesome-icon
        icon="times"
        class="delete-button__icon-close"
      ></font-awesome-icon>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import { imagesPlants, imagesAssets } from "@/assets/links/imagesLinks";
import Loading from "@/components/Loading/Loading.vue";

export default defineComponent({
  name: "Plant",
  components: {
    Loading,
  },
  props: [
    "id",
    "name",
    "image",
    "waterCount",
    "fertilizeCount",
    "death",
    "deathTime",
    "fertilizeTime",
  ],
  data() {
    return {
      imagesPlants,
      imagesAssets,
      newImage: "",
      hearts: 4,
      interval: +"",
      growing: false,
      disabledWater: false,
      disabledFertilize: false,
    };
  },
  computed: {
    ...mapState(["currentUser", "fertilizingTime", "myPlants", "isLoading"]),
  },

  methods: {
    ...mapActions([
      "deletePlantAction",
      "wateringPlantAction",
      "fertilizingPlantAction",
      "checkDeathAction",
      "checkFertilizeTimeAction",
      "growingPlant",
    ]),

    checkGrow() {
      if (this.waterCount >= 5 && this.fertilizeCount >= 5) {
        switch (this.image) {
          case imagesPlants.bunnyInitial:
            this.newImage = imagesPlants.bunnyBig;
            this.growth();
            break;
          case imagesPlants.onionInitial:
            this.newImage = imagesPlants.onionBig;
            this.growth();
            break;
          case imagesPlants.flowerInitial:
            this.newImage = imagesPlants.flowerBig;
            this.growth();
            break;
          case imagesPlants.bunnyBig:
            break;
          case imagesPlants.onionBig:
            break;
          case imagesPlants.flowerBig:
            break;
          default:
        }
      }
    },
    growth() {
      const params = { id: this.id, image: this.newImage };
      this.growingPlant(params);
      this.$toast("One of your pets grow-up!! yay!!");
    },

    async checkTimers() {
      const plantId = this.id;
      const result = await this.checkFertilizeTimeAction(plantId);
      if (result >= 1 * 60 * 1000) {
        this.disabledFertilize = false;
      }
    },

    async checkDeath() {
      const plantId = this.id;

      const result = await this.checkDeathAction(plantId);

      if (typeof result === "object") {
        clearInterval(this.interval);
        this.onDelete();
      }
      if (result >= 1 * 60 * 1000) {
        this.disabledWater = false;
      }
      if (result < 1 * 60 * 1000) {
        this.hearts = 4;
      }
      if (result >= 1 * 60 * 1000 && result < 4 * 60 * 1000) {
        this.hearts = 3;
      }
      if (result >= 2 * 60 * 1000 && result < 6 * 60 * 1000) {
        this.hearts = 2;
      }
      if (result >= 3 * 60 * 1000 && result < 8 * 60 * 1000) {
        this.hearts = 1;
      }
    },

    waterPlant() {
      this.disabledWater = true;
      const params = this.id;

      this.wateringPlantAction(params);
      this.checkDeath();
    },

    fertilizePlant() {
      this.disabledFertilize = true;
      const plantId = this.id;
      this.fertilizingPlantAction(plantId);
      this.checkTimers();
    },

    onDelete() {
      this.$toast("One of your plants has died");
      const params = this.id;
      this.deletePlantAction(params);
    },
  },
  mounted() {
    clearInterval(this.interval);
    this.checkDeath();
    this.checkGrow();
    this.interval = setInterval(() => {
      this.checkDeath();
      this.checkGrow();
    }, 5000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
});
</script>
<style lang="scss" scoped>
@import "../../styles/_variables";

.plant-card {
  display: flex;
  width: 244px;
  height: 84px;
  border-radius: 30px;
  background-color: $softBrown;
  border: 2px solid $mediumBrown;
  position: relative;
  &__image {
    position: relative;
    width: 80px;
    height: 80px;
    margin-right: 25px;
  }

  &__title {
    display: flex;
    height: 27px;
    margin-left: 10px;
    h2 {
      font-size: 20px;
    }
  }
  &__info {
    &--lifes {
      display: flex;
    }
  }
  &__buttons {
    display: flex;
    position: absolute;
    bottom: 5px;
    right: 10px;
  }
  .water-button {
    font-size: 18px;
    font-family: AmaticBold, "Gill Sans", "Gill Sans MT", Calibri,
      "Trebuchet MS", sans-serif;
    width: 64px;
    height: 30px;
    background-color: $softBlue;
    border: 2px solid white;
    border-radius: 30px;
    color: white;
    cursor: pointer;
    margin-right: 18px;
    &:active {
      width: 60px;
      height: 25px;
    }
    &.disabled-water {
      opacity: 0.7;
    }
  }
  .fertilize-button {
    font-size: 18px;
    font-family: AmaticBold, "Gill Sans", "Gill Sans MT", Calibri,
      "Trebuchet MS", sans-serif;
    width: 64px;
    height: 30px;
    background-color: $darkBrown;
    border: 2px solid $darkOrange;
    border-radius: 30px;
    color: white;
    cursor: pointer;
    &:active {
      width: 60px;
      height: 25px;
    }
    &.disabled-fertilize {
      opacity: 0.7;
    }
  }
  img {
    width: 75px;
    height: 80px;
    object-fit: contain;
  }

  .delete-button {
    height: 25px;
    width: 25px;
    position: absolute;
    right: -3px;
    top: -5px;
    background-color: $red;
    border: 2px solid white;
    border-radius: 50px;
    &__icon-close {
      font-size: 18px;
      color: white;
    }
  }
  .fullheart {
    width: 18px;
    height: 18px;
    background-image: url("https://i.ibb.co/y5HRx4f/full-Heart.png");
    background-size: cover;
  }
  .emptyHeart {
    width: 18px;
    height: 18px;
    background-image: url("https://i.ibb.co/H2CkHz8/empty-Heart.png");
    background-size: cover;
  }
}
</style>
