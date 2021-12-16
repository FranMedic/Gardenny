import "@testing-library/jest-dom";
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import Login from "@/components/Login/Login.vue";
import state from "@/store/state";
import router from "@/router";

describe("Given a Login component", () => {
  describe("When is rendered", () => {
    test("Then it should contain a button with a Login Text and type submit", () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: {
          userLogin: jest.fn(),
        },
      });

      const wrapper = mount(Login, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view", "router-link"],
      });

      expect(wrapper.html()).toContain(
        '<div class="button-container"><button class="button disabled" type="submit" disabled=""> Login </button></div>'
      );
    });
  });

  describe("when wroted in the username input", () => {
    test("then it should have inside the expected text", async () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: {
          userLogin: jest.fn(),
        },
      });
      const wrapper = mount(Login, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view", "router-link"],
      });

      const username = "patata";
      const inputUsername = wrapper.find("input");
      await wrapper.find("input[type=text]").setValue("patata");

      expect(inputUsername.element.value).toBe(username);
    });
  });

  describe("when wroted in the password input", () => {
    test("then it should have inside the expected text", async () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: {
          userLogin: jest.fn(),
        },
      });
      const wrapper = mount(Login, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view", "router-link"],
      });

      const password = "password";
      const inputPassword = wrapper.find("input");
      await wrapper.find("input[type=text]").setValue("password");

      expect(inputPassword.element.value).toBe(password);
    });
  });

  describe("when the form is submitted", () => {
    test("then it should invoke onSubmit", async () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: {
          userLogin: jest.fn(),
        },
      });

      const wrapper = mount(Login, {
        global: {
          plugins: [router, store],
        },

        stubs: ["router-view", "router-link"],
      });

      await wrapper.find("form").trigger("submit.prevent");
      expect(wrapper.emitted()).toHaveProperty("submit");
    });
  });

  describe("when the form is submitted with username and password", () => {
    test("then it should invoke userLogin", async () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: {
          userLogin: jest.fn(),
        },
      });

      const wrapper = mount(Login, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          methods: {
            onSubmit: jest.fn(),
          },
        },

        stubs: ["router-view", "router-link"],
      });

      const usernameInput = wrapper.get("input[id='username'");
      const passwordInput = wrapper.get("input[id='password'");
      const onSubmit = jest.fn();
      onSubmit();

      await usernameInput.setValue("pachacha");
      await passwordInput.setValue("pachachicha");
      await wrapper.get("form").trigger("submit.prevent");

      expect(wrapper.emitted()).toHaveProperty("submit");
      expect(onSubmit).toHaveBeenCalled();
      expect(store.state.currentUser).toBeDefined();
    });
  });
});
