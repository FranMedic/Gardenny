import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import LateralMenu from "@/components/LateralMenu/LateralMenu.vue";
import CreatePlantForm from "@/components/CreatePlantForm/CreatePlantForm.vue";
import CreatePetForm from "@/components/CreatePetForm/CreatePetForm.vue";
import router from "@/router";
import state from "@/store/state";

describe("given a LateralMenu component", () => {
  describe("when is rendered", () => {
    it("then should contain a div with buttons inside is rendered", () => {
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

  describe("When the button new pet is clicked", () => {
    test("then it should call the function createPet", async () => {
      const store = createStore({
        state() {
          return state;
        },

        actions: {
          userLogout: jest.fn(),
        },
      });

      const methods = {
        createPlant: jest.fn(),
      };
      const $router = {
        push: jest.fn(),
      };
      const $route = {
        push: jest.fn(),
      };
      const wrapper = mount(LateralMenu, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
          $router,
          methods,
        },
        components: {
          CreatePlantForm,
          CreatePetForm,
        },

        stubs: ["router-view", "router-link"],
      });
      await router.isReady();
      const newPetButtton = await wrapper.get(
        "button[class='menu__newPet--button']"
      );
      await newPetButtton.trigger("click");
      await router.isReady();
      const createPet = jest.fn();
      createPet();
      expect(createPet).toHaveBeenCalled();
    });
  });

  describe("When the button new plant is clicked", () => {
    test("then it should call the function createPlant", async () => {
      const store = createStore({
        state() {
          return state;
        },

        actions: {
          userLogout: jest.fn(),
        },
      });

      const methods = {
        createPet: jest.fn(),
      };
      const $router = {
        push: jest.fn(),
      };
      const $route = {
        push: jest.fn(),
      };
      const wrapper = mount(LateralMenu, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
          $router,
          methods,
        },
        components: {
          CreatePlantForm,
          CreatePetForm,
        },

        stubs: ["router-view", "router-link"],
      });
      await router.isReady();
      const newPlantButtton = await wrapper.get(
        "button[class='menu__newPlant--button']"
      );
      await newPlantButtton.trigger("click");
      await router.isReady();
      const createPlant = jest.fn();
      createPlant();
      expect(createPlant).toHaveBeenCalled();
    });
  });

  describe("When the button logout is clicked", () => {
    test("then it should call the function onLogout", async () => {
      const store = createStore({
        state() {
          return state;
        },

        actions: {
          userLogout: jest.fn(),
        },
      });

      const methods = {
        createPlant: jest.fn(),
      };
      const $router = {
        push: jest.fn(),
      };
      const $route = {
        push: jest.fn(),
      };
      const wrapper = mount(LateralMenu, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
          $router,
          methods,
        },
        components: {
          CreatePlantForm,
          CreatePetForm,
        },

        stubs: ["router-view", "router-link"],
      });
      await router.isReady();
      const logoutButtton = await wrapper.get(
        "button[class='menu__logout--button']"
      );
      await logoutButtton.trigger("click");
      await router.isReady();
      const onLogout = jest.fn();
      onLogout();
      expect(onLogout).toHaveBeenCalled();
    });
  });

  describe("When the button logout is clicked", () => {
    test("then it should call the function onLogout", async () => {
      const store = createStore({
        state() {
          return state;
        },

        actions: {
          userLogout: jest.fn(),
        },
      });

      const methods = {
        createPlant: jest.fn(),
      };
      const $router = {
        push: jest.fn(),
      };
      const $route = {
        push: jest.fn(),
      };
      const wrapper = mount(LateralMenu, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
          $router,
          methods,
        },
        components: {
          CreatePlantForm,
          CreatePetForm,
        },

        stubs: ["router-view", "router-link"],
      });
      await router.isReady();
      const tutorialButtton = await wrapper.get(
        "button[class='menu__tutorial--button']"
      );
      await tutorialButtton.trigger("click");
      await router.isReady();
      const openTutorial = jest.fn();
      openTutorial();
      expect(openTutorial).toHaveBeenCalled();
    });
  });
});
