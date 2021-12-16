import { render, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Login from "../../src/components/Login/Login.vue";

describe("Given a Login component", () => {
  describe("When it is rendered", () => {
    test("Then it should have a username input", () => {
      render(Login);

      const usernameLabel = screen.getByLabelText("Username");
      const usernameInput = screen.getByPlaceholderText("username");

      expect(usernameLabel).toBeInTheDocument();
      expect(usernameInput).toBeInTheDocument();
    });
  });
});
