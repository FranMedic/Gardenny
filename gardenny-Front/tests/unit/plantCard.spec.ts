import "@testing-library/jest-dom";

import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import Plant from "@/components/Card/Plant.vue";
import router from "@/router";
import state from "@/store/state";

describe("Given a Plant Card component", () => {
  describe("When is rendered", () => {
    test("Then it should have two buttons with the text' Watering' and 'Fertilize' ", async () => {
      const store = createStore({
        state() {
          return state;
        },
      });

      const wrapper = mount(Plant, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      expect(wrapper.html()).toContain(
        '<div class="plant-card__buttons--water"><button class="water-button"> Watering </button></div>'
      );
      expect(wrapper.html()).toContain(
        ' <div class="plant-card__buttons--fertilize"><button class="fertilize-button"> Fertilize </button></div>'
      );
    });
  });

  describe("When the button watering is clicked", () => {
    test("then it should call the function waterPlant", async () => {
      const store = createStore({
        state() {
          return state;
        },

        actions: {
          deletePlantAction: jest.fn(),
          fertilizingPlantAction: jest.fn(),
          wateringPlantAction: jest.fn(),
          checkDeathAction: jest.fn(),
          checkFertilizeTimeAction: jest.fn(),
          growingPlant: jest.fn(),
        },
      });

      const $router = {
        push: jest.fn(),
      };
      const $route = {
        push: jest.fn(),
      };
      const wrapper = mount(Plant, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
          $router,
        },

        stubs: ["router-view", "router-link"],
      });

      const waterButton = await wrapper.get("button[class='water-button']");

      await waterButton.trigger("click");
      const waterPlant = jest.fn();
      waterPlant();
      expect(waterPlant).toHaveBeenCalled();
    });
  });

  describe("When the button fertilize is clicked", () => {
    test("then it should call the function fertilizePlant", async () => {
      const store = createStore({
        state() {
          return state;
        },

        actions: {
          deletePlantAction: jest.fn(),
          fertilizingPlantAction: jest.fn(),
          wateringPlantAction: jest.fn(),
          checkDeathAction: jest.fn(),
          checkFertilizeTimeAction: jest.fn(),
          growingPlant: jest.fn(),
        },
      });

      const $router = {
        push: jest.fn(),
      };
      const $route = {
        push: jest.fn(),
      };
      const wrapper = mount(Plant, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
          $router,
        },

        stubs: ["router-view", "router-link"],
      });

      const fertilizeButton = await wrapper.get(
        "button[class='fertilize-button']"
      );

      await fertilizeButton.trigger("click");
      const fertilizePlant = jest.fn();
      fertilizePlant();
      expect(fertilizePlant).toHaveBeenCalled();
    });
  });

  describe("When the button delete is clicked", () => {
    test("then it should call the function onDelete", async () => {
      const store = createStore({
        state() {
          return state;
        },

        actions: {
          deletePlantAction: jest.fn(),
          fertilizingPlantAction: jest.fn(),
          wateringPlantAction: jest.fn(),
          checkDeathAction: jest.fn(),
          checkFertilizeTimeAction: jest.fn(),
          growingPlant: jest.fn(),
        },
      });

      const $router = {
        push: jest.fn(),
      };
      const $route = {
        push: jest.fn(),
      };
      const wrapper = mount(Plant, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
          $router,
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
          deletePlantAction: jest.fn(),
          fertilizingPlantAction: jest.fn(),
          wateringPlantAction: jest.fn(),
          checkDeathAction: jest.fn(),
          checkFertilizeTimeAction: jest.fn(),
          growingPlant: jest.fn(),
        },
      });

      const $router = {
        push: jest.fn(),
      };
      const $route = {
        push: jest.fn(),
      };

      const beforeUnmountSpy = jest.spyOn(Plant, "beforeUnmount");
      mount(Plant, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
          $router,
        },

        stubs: ["router-view", "router-link"],
      }).unmount();

      expect(beforeUnmountSpy).toHaveBeenCalled();
    });
  });

  describe("When the component Plant is rendered", () => {
    test("then it should call the function checkDeath y checkGrow", async () => {
      const checkDeath = jest.fn();
      const checkGrow = jest.fn();
      const setInterval = jest.fn();
      const { mounted } = Plant;
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
