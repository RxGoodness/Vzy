import { Document } from "mongoose";

export enum EUserStatus {
  PAID = "paid",
  PENDING = "pending",
  DEFAULTED = "defaulted"
}

export interface IUser {
  email: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  username: string;
  slug?: string;
  access_level?: number;
  is_active?: boolean;
  is_verified?: boolean;
  is_deleted?: boolean;
  verification_token?: string;
  token_validity?: Date;
  last_login?: Date;
  is_user_suspended: boolean;
  status?: EUserStatus;
}

export interface IUserUpdate {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  access_level?: number;
  status?: EUserStatus
}

export interface IUserDocument extends IUser, Document {}

export interface IUserWithToken extends IUser, Pick<IUserDocument, "_id"> {
  access_token: string;
}
