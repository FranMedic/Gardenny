import { createStore } from "vuex";
import { mount } from "@vue/test-utils";

import LateralMenu from "@/components/LateralMenu/LateralMenu.vue";
import router from "@/router";
import state from "@/store/state";

describe("LateralMenu.vue", () => {
  it("renders props.msg when passed", () => {
    const store = createStore({
      state() {
        return state;
      },
    });

    const wrapper = mount(LateralMenu, {
      global: {
        plugins: [router, store],
      },
      stubs: ["router-view"],
    });

    expect(wrapper.html()).toContain(
      '<div class="menu__newPlant"><button class="menu__newPlant--button"> New Plant </button></div>'
    );
  });
});
