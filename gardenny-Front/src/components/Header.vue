<template>
  <div
    v-if="plantModal || petModal || createPlantModal"
    class="headerTitleModal"
  >
    <h1>Gardenny</h1>
  </div>

  <div v-else class="headerTitle">
    <h1>Gardenny</h1>
  </div>
</template>

<script lang="ts" scoped>
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "Home",
  components: {},

  computed: {
    ...mapState(["plantModal", "petModal", "createPlantModal"]),
  },
});
</script>

<style lang="scss">
@import "../styles/_variables.scss";
.headerTitle {
  width: 100vw;
  height: 82px;
  background-color: rgba($color: #ffff, $alpha: 0.4);
  position: fixed;
  left: 168px;
  top: 0;

  h1 {
    left: 100px;
    position: fixed;
    width: 100vw;
    text-align: center;
    font-family: AmaticBold, "Gill Sans", "Gill Sans MT", Calibri,
      "Trebuchet MS", sans-serif;
    font-size: 72px;
    color: $yellow;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  }
}
.headerTitleModal {
  width: 100vw;
  height: 82px;
  background-color: rgba($color: #ffff, $alpha: 0.4);
  position: fixed;
  top: 0;

  h1 {
    width: 100vw;
    text-align: center;
    font-family: AmaticBold, sans-serif;
    font-size: 72px;
    color: $yellow;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  }
}

@media (min-width: 801px) {
  .headerTitle {
    left: 267px;
    height: 115px;

    h1 {
      left: 150px;
      font-size: 100px;
    }
  }
  .headerTitleModal {
    width: 100vw;
    height: 115px;

    h1 {
      font-size: 100px;
    }
  }
}
</style>
