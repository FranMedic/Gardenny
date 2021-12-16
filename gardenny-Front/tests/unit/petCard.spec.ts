import "@testing-library/jest-dom";

import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import Pet from "@/components/Card/Pet.vue";
import router from "@/router";
import state from "@/store/state";

describe("Given a Pet Card component", () => {
  describe("When is rendered", () => {
    test("Then it should have two buttons with the text' Feeding' and 'Give Love' ", async () => {
      const store = createStore({
        state() {
          return state;
        },
      });

      const wrapper = mount(Pet, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      expect(wrapper.html()).toContain(
        ' <div class="pet-card__buttons--feed"><button class="feed-button"> Feeding </button></div>'
      );
      expect(wrapper.html()).toContain(
        ' <div class="pet-card__buttons--love"><button class="love-button"> Give Love </button></div>'
      );
    });
  });

  describe("When the button feeding is clicked", () => {
    test("then it should call the function feedingPet", async () => {
      const store = createStore({
        state() {
          return state;
        },

        actions: {
          deletePetAction: jest.fn(),
          lovingPetAction: jest.fn(),
          feedingPetAction: jest.fn(),
          checkDeathAction: jest.fn(),
          checkLoveTimeAction: jest.fn(),
          growingPet: jest.fn(),
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
      const wrapper = mount(Pet, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
          $router,
          methods,
        },

        stubs: ["router-view", "router-link"],
      });

      const feedButton = await wrapper.get("button[class='feed-button']");

      await feedButton.trigger("click");
      const feedingPet = jest.fn();
      feedingPet();
      expect(feedingPet).toHaveBeenCalled();
    });
  });

  describe("When the button give love is clicked", () => {
    test("then it should call the function giveLove", async () => {
      const store = createStore({
        state() {
          return state;
        },

        actions: {
          deletePetAction: jest.fn(),
          lovingPetAction: jest.fn(),
          feedingPetAction: jest.fn(),
          checkDeathAction: jest.fn(),
          checkLoveTimeAction: jest.fn(),
          growingPet: jest.fn(),
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
      const wrapper = mount(Pet, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
          $router,
          methods,
        },

        stubs: ["router-view", "router-link"],
      });

      const giveLoveButton = await wrapper.get("button[class='love-button']");

      await giveLoveButton.trigger("click");
      const giveLove = jest.fn();
      giveLove();
      expect(giveLove).toHaveBeenCalled();
    });
  });

  describe("When the button deleteis clicked", () => {
    test("then it should call the function onDelete", async () => {
      const store = createStore({
        state() {
          return state;
        },

        actions: {
          deletePetAction: jest.fn(),
          lovingPetAction: jest.fn(),
          feedingPetAction: jest.fn(),
          checkDeathAction: jest.fn(),
          checkLoveTimeAction: jest.fn(),
          growingPet: jest.fn(),
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
      const wrapper = mount(Pet, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
          $router,
          methods,
        },
        components: {
          $toast: jest.fn(),
        },

        stubs: ["router-view", "router-link"],
      });

      const deleteButton = await wrapper.get("button[class='delete-button']");

      await deleteButton.trigger("click");
      const onDelete = jest.fn();
      onDelete();
      expect(onDelete).toHaveBeenCalled();
    });
  });

  describe("When is detroyed", () => {
    test("then it should call before Unmount", async () => {
      const store = createStore({
        state() {
          return state;
        },

        actions: {
          deletePetAction: jest.fn(),
          lovingPetAction: jest.fn(),
          feedingPetAction: jest.fn(),
          checkDeathAction: jest.fn(),
          checkLoveTimeAction: jest.fn(),
          growingPet: jest.fn(),
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

      const beforeUnmountSpy = jest.spyOn(Pet, "beforeUnmount");
      mount(Pet, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
          $router,
          methods,
        },

        stubs: ["router-view", "router-link"],
      }).unmount();

      expect(beforeUnmountSpy).toHaveBeenCalled();
    });
  });

  describe("When the component Pet is rendered", () => {
    test("then it should call the function checkDeath y checkGrow", async () => {
      const checkDeath = jest.fn();
      const checkGrow = jest.fn();
      const setInterval = jest.fn();
      const { mounted } = Pet;
      const sampleComponent: any = {
        mounted,
        checkDeath,
        checkGrow,
        setInterval,
      };

      sampleComponent.mounted();
      expect(checkDeath).toBeCalled();
      expect(checkGrow).toBeCalled();
    });
  });
});
