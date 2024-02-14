import { ObjectId } from "mongoose";

export interface ITokenPayload {
  _id: ObjectId | string;
  access_level: number;
}
