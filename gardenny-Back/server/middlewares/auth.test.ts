import jwt from "jsonwebtoken";
import auth from "./auth";

jest.mock("jsonwebtoken");

class NewError extends Error {
  code: number | undefined;
}

describe("Given an auth middleware", () => {
  describe("When it gets a request with an incorrect Authozization header", () => {
    test("then it should invoke the next function with an error with a message: Not authorized", () => {
      const req = {
        header: jest.fn(),
      };
      const next = jest.fn();

      const error = new NewError("Not authorized");

      auth(req, null, next);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });

  describe("When it gets a request with an incorrect Authozization header", () => {
    test("then it should invoke the next function with an error with a status 401", () => {
      const req = {
        header: jest.fn(),
      };
      const next = jest.fn();

      const error = new NewError("Not authorized");
      error.code = 401;

      auth(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it gets a request with an authorization header but a without a token", () => {
    test("then it should invoke the next function with a message `Token is missing...`", () => {
      const authHeader = "NOEZTOYAUTORIZADO";

      const req = {
        header: jest.fn().mockReturnValue(authHeader),
      };
      const next = jest.fn();
      const error = new NewError("Token is missing...");

      auth(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });

  describe("When it gets a request with an authorization header but a without a token", () => {
    test("then it should invoke the next function with a status 401", () => {
      const authHeader = "NOEZTOYAUTORIZADO";

      const req = {
        header: jest.fn().mockReturnValue(authHeader),
      };
      const next = jest.fn();
      const error = new NewError("Token is missing...");
      error.code = 401;

      auth(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it gets a request with an Authorization header but with an inconrrect token", () => {
    test("Then it should send an error with a message 'Wrong token' and an status 401", async () => {
      const req = {
        json: jest.fn(),
        header: jest.fn().mockReturnValue("Bearer token"),
      };

      const next = jest.fn();

      const error = new NewError("Wrong token");
      error.code = 401;

      jwt.verify = jest.fn().mockRejectedValue(false);

      await auth(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it gets an Authorization header and a correct token ", () => {
    test("Then it should assign to the properties of the req, the value of the user  ", async () => {
      const req = {
        header: jest.fn().mockReturnValue("Bearer token"),
        userId: "",
        userName: "",
      };
      const next = jest.fn();

      const userData = {
        id: "1234",
        name: "patata",
      };
      jwt.verify = jest.fn().mockResolvedValue(userData);

      await auth(req, null, next);

      expect(req.userId).toBe(userData.id);
      expect(req.userName).toBe(userData.name);
    });
  });
});
