<template>
  <div class="modal">
    <div class="modal__container">
      <div class="modal__header">
        <h1 class="modal__header--title">My Garden</h1>
      </div>
      <ul class="modal__list">
        <li v-for="plant in myPlants" :key="plant.id" class="modal__list--item">
          <Plant
            :id="plant.id"
            :name="plant.name"
            :image="plant.image"
            :waterCount="plant.waterCount"
            :fertilizeCount="plant.fertilizeCount"
            :death="plant.death"
            :deathTime="plant.deathTime"
            :fertilizeTime="plant.fertilizeTime"
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
import Plant from "@/components/Card/Plant.vue";

export default defineComponent({
  name: "MyPlantsList",
  components: {
    Plant,
  },
  computed: {
    ...mapState(["currentUser", "myPlants", "plantModal"]),
  },
  methods: {
    ...mapActions(["getUser", "activatePlantModalAction"]),

    onClose() {
      this.activatePlantModalAction();
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
  overflow: auto;
  background: transparent;

  &__container {
    position: relative;
    margin: 0 auto;
    margin-top: 15%;
    background-color: $softOrange;
    border: 3px solid $softBrown;
    border-radius: 20px;
    width: 600px;
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
      color: $darkBrown;
      font-size: 36px;
    }
  }
  &__header {
    text-align: center;
    &--title {
      color: $green;
      font-size: 48px;
    }
  }
  &__list {
    width: 600px;

    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    &--item {
      margin-bottom: 15px;
    }
  }
}
</style>
