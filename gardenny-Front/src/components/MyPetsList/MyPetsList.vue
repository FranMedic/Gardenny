<template>
  <div class="modal">
    <div class="modal__container">
      <div class="modal__header">
        <h1 class="modal__header--title">My Pets</h1>
      </div>
      <ul class="modal__list">
        <li v-for="pet in myPets" :key="pet.id" class="modal__list--item">
          <Pet
            :id="pet.id"
            :name="pet.name"
            :image="pet.image"
            :feedCount="pet.feedCount"
            :loveCount="pet.loveCount"
            :death="pet.death"
            :deathTime="pet.deathTime"
            :loveTime="pet.loveTime"
          />
        </li>
      </ul>
      <button @click="onClose" class="modal__container--close-button">
        <font-awesome-icon
          icon="times"
          class="modal__container--icon-close"
        ></font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import Pet from "@/components/Card/Pet.vue";

export default defineComponent({
  name: "MyPetsList",
  components: {
    Pet,
  },
  computed: {
    ...mapState(["currentUser", "myPets", "petModal"]),
  },
  methods: {
    ...mapActions(["getUser", "activatePetModalAction"]),

    onClose() {
      this.activatePetModalAction();
    },
  },

  mounted() {
    this.getUser();
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/_variables";
.modal {
  position: fixed;

  z-index: 3;
  width: 100vw;
  height: 100vh;

  background: transparent;

  &__container {
    position: relative;
    margin: 0 auto;
    margin-top: 15%;
    background-color: $softViolet;
    border: 3px solid $darkViolet;
    border-radius: 20px;
    width: 612px;
    height: 265px;
    overflow: scroll;
    &--close-button {
      position: absolute;
      top: 0%;
      right: 0%;
      background-color: transparent;
      border: none;
    }
    &--icon-close {
      color: $darkViolet;
      font-size: 36px;
    }
  }
  &__header {
    text-align: center;
    &--title {
      color: $mediumViolet;
      font-size: 48px;
    }
  }
  &__list {
    width: 595px;
    list-style: none;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    &--item {
      margin-bottom: 15px;
    }
  }
}
</style>
