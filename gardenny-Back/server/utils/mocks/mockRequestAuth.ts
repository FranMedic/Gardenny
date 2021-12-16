import RequestAuth from "../../interfaces/requestAuth";

const mockRequestAuth = (body?: any, header?: any, params?: any) => {
  const req = {} as RequestAuth;
  req.body = body;
  req.header = jest.fn().mockReturnValue(header);
  req.userId = "";
  req.params = params;

  return req;
};

export default mockRequestAuth;
