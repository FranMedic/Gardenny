import IError from "../interfaces/error";
import { generalErrorMiddleware, notFoundHandler } from "./errors";

const mockResponse = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res;
};

describe("Given a notFoundHandler function", () => {
  describe("When the endpoint of the route didnt existed", () => {
    test("Then it should invoke res object with json method and status method", () => {
      const res = mockResponse();
      const expectedError = { error: "Endpoint not found (╯°□°）╯︵ ┻━┻`" };

      notFoundHandler(null, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given generalErrorMiddleware function", () => {
  describe("When it receives an error, and no error code and no error message", () => {
    test("then it should invoke the res object with an status 500 ", () => {
      const error = new Error(
        "General Error of server (╯°□°）╯︵ ┻━┻"
      ) as IError;
      const res = mockResponse();

      const next = () => {};

      generalErrorMiddleware(error, null, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("When it receives an error, and no error code and no error message", () => {
    test("then it should invoke the res object with a message General Error of server (╯°□°）╯︵ ┻━┻ ", () => {
      const error = new Error(
        "General Error of server (╯°□°）╯︵ ┻━┻"
      ) as IError;
      const res = mockResponse();

      const next = () => {};

      generalErrorMiddleware(error, null, res, next);

      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe("When it recieves an error with a code 401 and message patatas hervidas", () => {
    test("then it should invoke the res object with the code and the message specified", () => {
      const error = new Error("Validation Error") as IError;
      error.code = 401;
      error.message = "patatas hervidas";

      const res = mockResponse();
      const next = () => {};

      generalErrorMiddleware(error, null, res, next);

      expect(res.json).toHaveBeenCalledWith({ error: error.message });

      expect(res.status).toHaveBeenCalledWith(error.code);
    });
  });

  describe("when it receives a ValidationError", () => {
    test("then it should it should invoke res object with a Sent wrong format of request ! (╯°□°）╯︵ ┻━┻, and an error code of 400", () => {
      const res = mockResponse();

      const error = new Error(
        "Sent wrong format of request ! (╯°□°）╯︵ ┻━┻"
      ) as IError;

      error.statusCode = 400;

      generalErrorMiddleware(error, null, res, null);

      expect(res.json).toHaveBeenCalledWith({ error: error.message });
      expect(res.status).toHaveBeenCalledWith(error.statusCode);
    });
  });
});
