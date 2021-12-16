import { Request } from "express";

interface RequestAuth extends Request {
  userId?: string;
  username?: string;
  userName?: string;
  params: any;
}

export default RequestAuth;
