import { IUserWithToken } from "./user.interface";

export interface ISignUpPayload {
  email: string;
  password: string;
  username: string;
  dob?: string;
  firstname?: string;
  lastname?: string;
  country?: string;
  ref?: any;
  slug?: any;
  signupType?: string;
}

export interface ISignUpResponse {
  error: boolean;
  user: IUserWithToken;
}

export interface IDevice {
  ip: string;
}

export interface ISocialSignUpPayload {
  email: string;
  firstname: string;
  lastname: string;
  username: string;
  picture: {
    path: string;
  };
  google?: string;
  facebook?: string;
  instagram?: string;
  dob: string;
  ref?: any;
  slug?: string;
  signupType?: string;
}
