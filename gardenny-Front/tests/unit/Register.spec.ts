import { mount } from "@vue/test-utils";
import { createStore } from "vuex";

import state from "@/store/state";
import Register from "@/components/Register/Register.vue";
import router from "@/router";

describe("Given a Register component", () => {
  describe("When is rendered", () => {
    test("Then it should contain a button with a Login Text and type submit", async () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: {
          userRegisterAction: jest.fn(),
        },
      });

      const wrapper = mount(Register, {
        global: {
          plugins: [router, store],
        },

        stubs: ["router-view", "router-link"],
      });
      await router.isReady();
      expect(wrapper.html()).toContain(
        '<form class="register-form" autocomplete="off">'
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
          userRegisterAction: jest.fn(),
        },
      });

      const wrapper = mount(Register, {
        global: {
          plugins: [router, store],
        },

        stubs: ["router-view", "router-link"],
      });
      await router.isReady();
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
          userRegisterAction: jest.fn(),
        },
      });

      const wrapper = mount(Register, {
        global: {
          plugins: [router, store],
        },

        stubs: ["router-view", "router-link"],
      });
      await router.isReady();
      const password = "password";
      const inputPassword = wrapper.find("input");
      await wrapper.find("input[type=text]").setValue("password");
      await router.isReady();
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
          userRegisterAction: jest.fn(),
        },
      });

      const wrapper = mount(Register, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view", "router-link"],
      });
      await router.isReady();
      await wrapper.find("form").trigger("submit.prevent");
      await router.isReady();
      expect(wrapper.emitted()).toHaveProperty("submit");
    });
  });
});
