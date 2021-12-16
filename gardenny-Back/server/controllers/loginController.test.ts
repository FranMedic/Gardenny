import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../database/models/user";
import { userLogin, userRegister } from "./loginControllers";

jest.mock("../../database/models/user");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

class NewError extends Error {
  code: number | undefined;
}

describe("Given a userRegister function", () => {
  describe("When it receives a body with a username already exists", () => {
    test("then it should invoke the next function with and error with a message: Username already in use (T︵T,)", async () => {
      const usernameFake = "patatafrita";
      const req = {
        body: {
          username: usernameFake,
        },
      };
      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue(true);
      const error = new NewError("Username already in use (T︵T,)");
      error.code = 400;

      await userRegister(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });

  describe("When it receives a body with a username already exists", () => {
    test("then it should invoke the next function with and error with an status 400", async () => {
      const usernameFake = "patatafrita";
      const req = {
        body: {
          username: usernameFake,
        },
      };
      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue(true);
      const error = new NewError("Username already in use (T︵T,)");
      error.code = 400;

      await userRegister(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it receives a request with a new username", () => {
    test("then it should respond with the new user", async () => {
      const userFake = {
        name: "Patata",
        username: "franny",
        password: "quiereComida",
      };

      const req = {
        body: userFake,
      };
      const res = {
        json: jest.fn(),
      };
      User.findOne = jest.fn().mockResolvedValue(false);

      await userRegister(req, res, null);

      expect(res.json).toHaveBeenCalledWith("User Registered");
    });
  });
});

describe("Given a userLogin function", () => {
  describe("When it receives a req object with wrong username, and a next function", () => {
    test("Then it should invoke the next function with an error with a message and a status code inside", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      const req = {
        body: {},
      };
      const next = jest.fn();
      const expectedError = new NewError("Wrong Credentials ʰᵘʰ (ꐦ○_○）✧");
      expectedError.code = 401;

      await userLogin(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });

  describe("When it receives a right username but a wrong password", () => {
    test("then it should invoke the next function with an error with a message and a 401 error code", async () => {
      const req = {
        body: {
          username: "franny",
          password: "patata",
        },
      };
      User.findOne = jest
        .fn()
        .mockResolvedValue({ username: "franny", password: "lechuga" });

      const next = jest.fn();
      const expectedError = new NewError("Wrong Credentials ʰᵘʰ (ꐦ○_○）✧");
      expectedError.code = 401;
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await userLogin(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });

  describe("when it receives a right username and password", () => {
    test("then it should invoke res.json with an object with a new token", async () => {
      const req = {
        body: { username: "franny", password: "patata" },
      };
      const res = {
        json: jest.fn(),
      };
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const expectedToken = "pulpo";
      jwt.sign = jest.fn().mockReturnValue(expectedToken);
      const expectedResponse = { token: expectedToken };
      await userLogin(req, res, null);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
