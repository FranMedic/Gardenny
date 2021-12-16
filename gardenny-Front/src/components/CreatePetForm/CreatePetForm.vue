<template>
  <div class="form-modal">
    <form
      id="form"
      class="form"
      autocomplete="off"
      novalidate
      @submit.prevent="onSubmit"
    >
      <div class="form__title">
        <h1>Create a New Pet</h1>
      </div>
      <p class="message">{{ errorMessage }}</p>
      <div class="form__input-container">
        <label for="name" class="form__input-container--name-label">
          Name:
        </label>
        <input
          id="name"
          type="text"
          class="form__input-container--name-input"
          v-model="name"
          placeholder="name"
        />
      </div>

      <div class="form__choose-image">
        <h2 class="form__choose-image--title">Choose One :</h2>
        <div class="form__choose-image--container">
          <div class="form__choose-image--images">
            <label for="image1" class="form__choose-image--image">
              <img
                src="https://i.ibb.co/bHSBzFz/bunny-Initial.png"
                alt="bunny-Initial"
                border="0"
              />
            </label>
            <input
              id="image1"
              type="radio"
              name="image"
              class="input-image1"
              placeholder="firstImage"
              value="image1"
              v-model="image"
            />
          </div>
          <div class="form__choose-image--images">
            <label for="image2" class="form__choose-image--image">
              <img
                src="https://i.ibb.co/YDZKP3H/dog-Initial.png"
                alt="dog-Initial"
                border="0"
              />
            </label>
            <input
              id="image2"
              class="input-image2"
              type="radio"
              placeholder="secondImage"
              value="image2"
              v-model="image"
            />
          </div>
          <div class="form__choose-image--images">
            <label for="image3" class="form__choose-image--image">
              <img
                src="https://i.ibb.co/QdYZwJW/cat-Initial.png"
                alt="cat-Initial"
                border="0"
              />
            </label>

            <input
              id="image3"
              type="radio"
              class="input-image3"
              value="image3"
              v-model="image"
              placeholder="thirdImage"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="form__button-create"
        :disabled="this.name.length < 3 || this.image === ''"
        :class="this.name.length < 3 || this.image === '' ? 'disabled' : ''"
      >
        Create
      </button>
      <button @click="onClose" type="reset" class="form__close-button">
        <font-awesome-icon
          icon="times"
          class="form__icon-close"
        ></font-awesome-icon>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import { imagesPets } from "@/assets/links/imagesLinks";

export default defineComponent({
  name: "CreatePet",

  data() {
    return {
      name: "",
      image: "",
      deathTime: new Date().toISOString(),
      loveTime: new Date().toISOString(),
      imagesPets,
      wrongData: false,
      errorMessage: "",
    };
  },

  computed: {
    ...mapState(["currentUser", "myPets", "createPetModal", "isLoading"]),
  },
  methods: {
    ...mapActions(["createNewPetAction", "activateCreatePetModalAction"]),

    onClose() {
      this.activateCreatePetModalAction();
    },

    async onSubmit() {
      if (
        this.image !== "" &&
        this.name !== "" &&
        this.deathTime !== "" &&
        this.loveTime !== "" &&
        this.name.length <= 10
      ) {
        if (this.image === "image1") {
          this.image = imagesPets.bunnyPetInitial;
        }
        if (this.image === "image2") {
          this.image = imagesPets.dogInitial;
        }
        if (this.image === "image3") {
          this.image = imagesPets.catInitial;
        }
        const app = {
          name: this.name,
          image: this.image,
          deathTime: this.deathTime,
          loveTime: this.loveTime,
        };
        this.createNewPetAction(app);
        this.$toast("A New Pet has been added to your Gardenny! ");
        this.image = "";
        this.name = "";
      } else if (this.name.length > 10) {
        this.wrongData = true;
        this.errorMessage = "The name is too long, max 10 characters";
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/_variables";
.form-modal {
  position: fixed;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background: transparent;
  .message {
    color: black;
    background-color: rgba(255, 0, 0, 0.5);
    font-family: AmaticBold, "Gill Sans", "Gill Sans MT", Calibri,
      "Trebuchet MS", sans-serif;
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin: 0 auto;
    margin-top: 15%;
    background-color: $pink;
    border: 5px solid $violet;
    border-radius: 20px;
    width: 500px;
    overflow: scroll;
    height: 265px;

    &__close-button {
      position: absolute;
      top: 0;
      right: 8px;
      background-color: transparent;
      border: none;
    }
    &__icon-close {
      color: $darkViolet;
      font-size: 36px;
    }
    &__input-container {
      margin-left: 30px;
      width: 450px;

      &--name-label {
        padding-right: 10px;
        font-size: 24px;
        font-family: AmaticBold, "Gill Sans", "Gill Sans MT", Calibri,
          "Trebuchet MS", sans-serif;
        &.wrong {
          color: red;
        }
      }
      &--name-input {
        border-radius: 30px;
        padding-left: 20px;
        font-size: 20px;
        width: 300px;
        height: 30px;
        border: 2px solid $violet;
        font-family: Amatic, "Gill Sans", "Gill Sans MT", Calibri,
          "Trebuchet MS", sans-serif;
        outline: 3px;
        outline-color: $darkViolet;
        &.wrong {
          color: red;
        }
      }
    }

    &__choose-image {
      &--title {
        text-align: center;
        font-size: 24px;
      }
      &--images {
        border: 2px solid $violet;
        border-radius: 20px;
        width: 80px;
        height: 80px;
        margin-left: 20px;
      }
      &--images:hover {
        outline: none;
        box-shadow: 2px 2px 2px 2px $hotPink;
      }
      input {
        &.input-image1 {
          position: absolute;
          left: 25%;
          top: 45%;
        }
        &.input-image2 {
          position: absolute;
          left: 45%;
          top: 45%;
          color: $pink;
        }
        &.input-image3 {
          position: absolute;
          left: 66%;
          top: 45%;
        }
        &::after {
          width: 10px;
          height: 10px;
          border-radius: 15px;
          top: -2px;
          left: -1px;
          position: relative;
          background-color: $pink;
          content: "";
          display: inline-block;
          visibility: visible;
          border: 3px solid white;
        }
        &:checked::after {
          width: 10px;
          height: 10px;
          border-radius: 15px;
          top: -2px;
          left: -1px;
          position: relative;
          background-color: $yellow;
          content: "";
          display: inline-block;
          visibility: visible;
          border: 2px solid white;
        }
      }

      &--image {
        img {
          width: 80px;
          height: 80px;
          object-fit: contain;
        }
      }

      &--container {
        display: flex;
        margin-bottom: 7px;
      }
    }
    &__title {
      text-align: center;
      h1 {
        font-size: 36px;
        font-family: AmaticBold, "Gill Sans", "Gill Sans MT", Calibri,
          "Trebuchet MS", sans-serif;
      }
    }
    &__button-create {
      font-family: AmaticBold, "Gill Sans", "Gill Sans MT", Calibri,
        "Trebuchet MS", sans-serif;
      width: 250px;
      height: 60px;
      background-color: $hotPink;
      border: 2px solid $violet;
      border-radius: 30px;
      font-size: 48px;
      color: white;

      &.disabled {
        background-color: rgba($color: $hotPink, $alpha: 0.5);
      }
    }
  }
}
</style>
