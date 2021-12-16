<template>
  <router-view />
</template>

<script lang="ts" scoped>
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "app",
  components: {},

  methods: {
    ...mapActions(["tokenSearch"]),
  },
  mounted() {
    if (localStorage.getItem("user")) {
      this.tokenSearch();
    } else {
      this.$router.push("/login");
    }
  },
});
</script>

<style lang="scss">
@import "./styles/_variables";
* {
  margin: 0;
  padding: 0;
}
@font-face {
  font-family: "Amatic";
  src: local("Amatic"),
    url(./fonts/Amatic/AmaticSC-Regular.woff) format("woff2");
  font-display: swap;
}
@font-face {
  font-family: "AmaticBold";
  src: local("Amatic"), url(./fonts/Amatic/AmaticSC-Bold.woff) format("woff2");
  font-display: swap;
}

#app {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Amatic, "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
    sans-serif;
  display: flex;
}

::-webkit-scrollbar {
  width: 10px;
  height: 80%;
}

::-webkit-scrollbar-track {
  border: none;
  background-color: transparent;
  border-radius: 20px;
}
::-webkit-scrollbar-thumb {
  background: $hotPink;
  border-radius: 20px;
}
::-webkit-scrollbar-button {
  display: none;
}
::-webkit-scrollbar-corner {
  display: none;
}
::-webkit-resizer {
  height: 20px;
}
::-webkit-scrollbar-track-piece:end {
  background: transparent;
  margin-bottom: 30px;
}

::-webkit-scrollbar-track-piece:start {
  background: transparent;
  margin-top: 30px;
}
</style>
