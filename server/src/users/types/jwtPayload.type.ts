import { Types } from "mongoose";

export type JwtPayload = {
    email: string;
    sub: Types.ObjectId;
  };