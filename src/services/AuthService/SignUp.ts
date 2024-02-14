import { hash } from "bcryptjs";
import UserModel from "../../models/user";
import { SignToken } from "./SignToken";
import { ISignUpPayload, IDevice } from "../../interface";
import { config } from "../../config/env";

const { APP_URL } = config;

export const SignUp = async (payload: ISignUpPayload) => {
  /**
   * @param {object} payload payload for user signup
   * @param {string} payload.username user's unique username
   */

  const {
    email,
    password,
    firstname,
    lastname,
    username,
  } = payload;

  const hashedPassword = await hash(password, 10);

 
  let has_basic_info;

 
  const user: any = await UserModel.create({
    email,
    password: hashedPassword,
    firstname,
    lastname,
    username,
    has_basic_info,
  });
  
  const userWithToken = await SignToken({
    _id: user._id,
    access_level: user.access_level,
  });

  return {
    error: false,
    user: userWithToken,
  };
};
