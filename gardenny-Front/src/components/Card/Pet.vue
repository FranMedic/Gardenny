<template>
  <div class="pet-card">
    <transition name="fade" mode="out-in" appear>
      <div class="pet-card__image">
        <Loading v-if="this.isLoading && this.growing" />
        <img v-else :src="image" alt="pixel-art animal" />
      </div>
    </transition>
    <div class="pet-card__info">
      <div class="pet-card__title">
        <h2>{{ name }}</h2>
      </div>
      <div class="pet-card__info--lifes">
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
    <div class="pet-card__lifes"></div>
    <div class="pet-card__buttons">
      <div class="pet-card__buttons--feed">
        <button
          class="feed-button"
          @click="feedingPet"
          :class="this.disabledFeed ? 'disabled-feed' : ''"
          :disabled="this.disabledFeed"
        >
          Feeding
        </button>
      </div>
      <div class="pet-card__buttons--love">
        <button
          class="love-button"
          @click="giveLove"
          :class="this.disabledLove ? 'disabled-love' : ''"
          :disabled="this.disabledLove"
        >
          Give Love
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
import { imagesPets, imagesAssets } from "@/assets/links/imagesLinks";
import Loading from "@/components/Loading/Loading.vue";

export default defineComponent({
  name: "Pet",
  components: {
    Loading,
  },
  props: [
    "id",
    "name",
    "image",
    "feedCount",
    "loveCount",
    "death",
    "deathTime",
    "loveTime",
    "checkDeathTime",
  ],
  data() {
    return {
      imagesPets,
      imagesAssets,
      newImage: "",
      hearts: 4,
      interval: +"",
      growing: false,
      disabledFeed: false,
      disabledLove: false,
    };
  },

  computed: {
    ...mapState(["currentUser", "lovingTime", "myPets", "isLoading"]),
  },
  methods: {
    ...mapActions([
      "deletePetAction",
      "lovingPetAction",
      "feedingPetAction",
      "checkDeathAction",
      "checkLoveTimeAction",
      "growingPet",
    ]),
    checkGrow() {
      if (this.feedCount >= 5 && this.loveCount >= 5) {
        switch (this.image) {
          case imagesPets.bunnyPetInitial:
            this.newImage = imagesPets.bunnyMedium;
            this.growing = true;
            this.growth();
            break;
          case imagesPets.dogInitial:
            this.newImage = imagesPets.dogMedium;
            this.growing = true;
            this.growth();
            break;
          case imagesPets.catInitial:
            this.newImage = imagesPets.catMedium;
            this.growing = true;
            this.growth();
            break;
          case imagesPets.bunnyMedium:
            this.growing = false;
            break;
          case imagesPets.dogMedium:
            this.growing = false;
            break;
          case imagesPets.catMedium:
            this.growing = false;
            break;
          default:
        }
      }
    },

    growth() {
      const params = { id: this.id, image: this.newImage };
      this.$toast("One of your pets grow-up :D");
      this.growingPet(params);
    },

    giveLove() {
      this.disabledLove = true;
      const petId = this.id;
      this.lovingPetAction(petId);
      this.checkTimers();
    },
    feedingPet() {
      this.disabledFeed = true;
      const petId = this.id;
      this.feedingPetAction(petId);
      this.checkDeath();
    },

    async checkDeath() {
      const petId = this.id;

      const result = await this.checkDeathAction(petId);

      if (typeof result === "object") {
        clearInterval(this.interval);
        this.onDelete();
      }
      if (result >= 1 * 60 * 1000) {
        this.disabledFeed = false;
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

    async checkTimers() {
      const petId = this.id;
      const result = await this.checkLoveTimeAction(petId);
      if (result >= 1 * 60 * 1000) {
        this.disabledLove = false;
      }
    },

    onDelete() {
      clearInterval(this.interval);
      const params = this.id;
      this.deletePetAction(params);
      this.$toast("One of your pets has died ");
    },
  },
  mounted() {
    clearInterval(this.interval);
    this.checkGrow();
    this.checkDeath();
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

.pet-card {
  display: flex;
  width: 244px;
  height: 84px;
  border-radius: 30px;
  background-color: $violet;
  border: 2px solid $darkViolet;
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
      font-size: 22px;
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
    justify-content: space-between;
    bottom: 5px;
    right: 10px;
  }
  .feed-button {
    font-size: 18px;
    font-family: AmaticBold, "Gill Sans", "Gill Sans MT", Calibri,
      "Trebuchet MS", sans-serif;
    width: 64px;
    height: 30px;
    background-color: $orange;
    border: 2px solid $darkBrown;
    border-radius: 30px;
    color: white;
    margin-right: 20px;
    cursor: pointer;
    &:active {
      width: 60px;
      height: 25px;
    }
    &:target {
      width: 60px;
      height: 25px;
    }
    &.disabled-feed {
      opacity: 0.7;
    }
  }
  .love-button {
    font-size: 18px;
    font-family: AmaticBold, "Lucida Sans", "Lucida Sans Regular",
      "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    width: 64px;
    height: 30px;
    background-color: $darkPink;
    border: 2px solid white;
    border-radius: 30px;
    color: white;
    cursor: pointer;
    &:active {
      width: 62px;
      height: 27px;
    }
    &:target {
      width: 60px;
      height: 25px;
    }
    &.disabled-love {
      opacity: 0.7;
    }
  }
  img {
    width: 80px;
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
</style>
