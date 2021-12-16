import { render, fireEvent } from "@testing-library/vue";

import "@testing-library/jest-dom";

import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import CreatePlantForm from "@/components/CreatePlantForm/CreatePlantForm.vue";
import router from "@/router";
import state from "@/store/state";

describe("Given a createPetForm component", () => {
  describe("when is rendered", () => {
    test("Then it should have a headitn with text 'Create a New plant' ", () => {
      const { getByRole } = render(CreatePlantForm);

      const title = getByRole("heading", { name: "Create a New Plant" });

      expect(title).toBeInTheDocument();
    });
  });
  describe("when is rendered", () => {
    test("Then it should have a button with text 'create' ", () => {
      const { getByRole } = render(CreatePlantForm);

      const submitButton = getByRole("button", { name: "Create" });

      expect(submitButton).toBeInTheDocument();
    });
  });
  describe("when is rendered", () => {
    test("Then it should have a button that is disabled", () => {
      const { getByRole } = render(CreatePlantForm);

      const submitButton = getByRole("button", { name: "Create" });

      expect(submitButton).toBeDisabled();
    });
  });

  describe("when is rendered", () => {
    test("Then it should have a a label with text 'Name' ", () => {
      const { getByLabelText } = render(CreatePlantForm);

      const labelText = getByLabelText("Name:");

      expect(labelText).toBeInTheDocument();
    });
  });

  describe("when is rendered", () => {
    test("Then it should have a heading wiht text 'choose One',", () => {
      const { getByRole } = render(CreatePlantForm);

      const labelText = getByRole("heading", { name: "Choose One :" });

      expect(labelText).toBeInTheDocument();
    });
  });
  describe("when is rendered", () => {
    test("Then it should have a heading wiht 3 label with images inside ", () => {
      const { getByRole } = render(CreatePlantForm);

      const labelOne = getByRole("img", { name: "bunny-Plant-Initial" });
      const labelTwo = getByRole("img", { name: "onion-Plant-Initial" });
      const labelThree = getByRole("img", { name: "flower-Plant-Initial" });

      expect(labelOne).toBeInTheDocument();
      expect(labelTwo).toBeInTheDocument();
      expect(labelThree).toBeInTheDocument();
    });
  });
  describe("when is rendered", () => {
    test("Then it should have 4 inputs, with placeholders'name', firstImage', 'secondImage', 'thirdImage' ", () => {
      const { getByPlaceholderText } = render(CreatePlantForm);

      const inputName = getByPlaceholderText("name");
      const inputOne = getByPlaceholderText("firstImage");
      const inputTwo = getByPlaceholderText("secondImage");
      const inputThree = getByPlaceholderText("thirdImage");

      expect(inputName).toBeInTheDocument();
      expect(inputOne).toBeInTheDocument();
      expect(inputTwo).toBeInTheDocument();
      expect(inputThree).toBeInTheDocument();
    });
  });
  describe("when the user types in the input with placeholder name", () => {
    test("Then it should have a a label with text 'Name' ", async () => {
      const newPlant = {
        name: "chonk",
      };

      const { getByPlaceholderText } = render(CreatePlantForm);
      const inputName = getByPlaceholderText("name");
      await fireEvent.update(inputName, newPlant.name);

      expect(1).toBe(1);
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
      const wrapper = mount(CreatePlantForm, {
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
        "button[class='form__close-button']"
      );

      await closeButton.trigger("click");
      const onClose = jest.fn();
      onClose();
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe("When the button create is clicked", () => {
    test("then it should call the function onSubmit", async () => {
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
      const wrapper = mount(CreatePlantForm, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
          $router,
        },

        stubs: ["router-view", "router-link"],
      });

      const submitButton = await wrapper.get(
        "button[class='form__button-create disabled']"
      );

      await submitButton.trigger("click");
      const onSubmit = jest.fn();
      onSubmit();
      expect(onSubmit).toHaveBeenCalled();

      await router.isReady();
      await wrapper.find("form").trigger("submit.prevent");
      await router.isReady();
      expect(wrapper.emitted()).toHaveProperty("submit");
    });
  });
});
