import { createApp } from "vue";
import DKToast from "vue-dk-toast";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import App from "./App.vue";
import router from "./router";
import store from "./store";

library.add(fas);
library.add(fab);
library.add(far);

dom.watch();

createApp(App)
  .use(DKToast, {
    duration: 3000,
    positionX: "left",
    positionY: "bottom",
    slotLeft: "<i class='fas fa-skull-crossbones'></i>",
    styles: {
      color: "#fff",
      backgroundColor: "#ff447c",
      width: "200px",
      height: "50px",
      border: "3px solid #fff",
      borderRadius: "20px",
    },
    class: "custom-class",
  })
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
