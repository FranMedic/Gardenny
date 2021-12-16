<template>
  <div class="modal">
    <div class="modal__container">
      <div class="modal__header">
        <h1 class="modal__header--title">Tutorial Gardenny</h1>
      </div>
      <div class="text-container">
        <h2>Bienvenidos a Gardenny!!</h2>
        <h3>Sigue estos pasos para jugar!</h3>
        <p>Primero, crea un mascota o una planta tuya!!</p>
        <p>
          Haz click en los botones de New Plant o New Pet en el menu lateral
        </p>

        <p>
          Cierra al modal y pincha en los botones de My pets o My garden para
          encontrar tus nuevos compañeros!!
        </p>

        <p>Dentro estarán las cartas de tus mascotas o plantas creadas</p>

        <p>
          Podras cuidarlas y si quieres tambien borrarlas, <br />
          cada mascota o planta tiene 4 vidas
        </p>

        <p>
          Cuidado! Si los corazones llegan a 0 (cero) moriran :(, para evitarlo
          debes regarlas o alimentarlas seguidamente!
        </p>

        <p>Si quieres salir tendrás un boton de Logout en el menu lateral</p>

        <h2>Enjoy Gardenny!! by Franny</h2>
      </div>

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
import { mapActions } from "vuex";

export default defineComponent({
  name: "Tutorial",

  methods: {
    ...mapActions(["getUser", "activateTutorialAction"]),

    onClose() {
      this.activateTutorialAction();
    },
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

  .text-container {
    text-align: center;
  }

  &__container {
    position: relative;
    margin: 0 auto;
    margin-top: 15%;
    background-color: rgb(129, 194, 255);
    border: 3px solid $darkBlue;
    border-radius: 20px;
    width: 600px;
    height: 265px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    font-family: AmaticBold, "Gill Sans", "Gill Sans MT", Calibri,
      "Trebuchet MS", sans-serif;

    p {
      font-size: 30px;
      margin: 15px;
      padding-bottom: 20px;
    }

    align-items: center;
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
      color: $darkBlue;
      font-size: 48px;
    }
  }
  h2 {
    color: $darkViolet;
  }
  img {
    max-width: 300px;
    max-height: 50px;
    object-fit: contain;
  }
}
</style>
