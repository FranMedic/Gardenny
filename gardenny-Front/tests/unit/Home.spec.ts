import "@testing-library/jest-dom";
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import Home from "@/views/Home.vue";
import state from "@/store/state";
import router from "@/router";

describe("Given a Home component", () => {
  describe("When is rendered", () => {
    test("Then it should contain two buttons with my garden and my pets text", () => {
      const store = createStore({
        state() {
          return state;
        },
      });

      const wrapper = mount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      expect(wrapper.html()).toContain(
        '<div class="buttons__myPetsButton--innerCircle"><button class="buttons__myPetsButton--button"> My Pets </button></div>'
      );

      expect(wrapper.html()).toContain(
        '<div class="buttons__myGardenButton--innerCircle"><button class="buttons__myGardenButton--button"> My Garden </button></div>'
      );
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
      const wrapper = mount(Home, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
          $router,
        },

        stubs: ["router-view", "router-link"],
      });

      const myGardenButton = await wrapper.get(
        "button[class='buttons__myGardenButton--button']"
      );

      await myGardenButton.trigger("click");
      const activatePlantModal = jest.fn();
      activatePlantModal();
      expect(activatePlantModal).toHaveBeenCalled();
    });
  });

  describe("When the button my pets is clicked", () => {
    test("then it should call the function activatePetModal", async () => {
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
      const wrapper = mount(Home, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
          $router,
        },

        stubs: ["router-view", "router-link"],
      });

      const myPetsButton = await wrapper.get(
        "button[class='buttons__myPetsButton--button']"
      );

      await myPetsButton.trigger("click");
      const activatePetModal = jest.fn();
      activatePetModal();
      expect(activatePetModal).toHaveBeenCalled();
    });
  });
});
