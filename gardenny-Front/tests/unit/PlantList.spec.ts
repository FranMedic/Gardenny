import "@testing-library/jest-dom";

import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import MyPlantsList from "@/components/MyPlantsList/MyPlantsList.vue";
import router from "@/router";
import state from "@/store/state";

describe("Given a MyPlantsList component", () => {
  describe("When is rendered", () => {
    test("Then it should have a heading with the text' My garden' ", async () => {
      const store = createStore({
        state() {
          return state;
        },
      });

      const wrapper = mount(MyPlantsList, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      expect(wrapper.html()).toContain(
        '<h1 class="modal__header--title">My Garden</h1>'
      );
      expect(wrapper.find("h1").text()).toContain("My Garden");
    });
  });

  describe("When the button close is clicked", () => {
    test("then it should call the function onClose", async () => {
      const store = createStore({
        state() {
          return state;
        },
      });

      const $router = {
        push: jest.fn(),
      };
      const $route = {
        push: jest.fn(),
      };
      const wrapper = mount(MyPlantsList, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
          $router,
        },

        stubs: ["router-view", "router-link"],
      });

      const closeButton = await wrapper.get(
        "button[class='modal__container--close-button']"
      );

      await closeButton.trigger("click");
      const onClose = jest.fn();
      onClose();
      expect(onClose).toHaveBeenCalled();
    });
  });
});
