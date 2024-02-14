import { hash } from "bcryptjs";
import { nanoid } from "nanoid";
import UserModel from "../../models/user";
import { SignToken } from "./SignToken";
import { ISignUpPayload, IDevice } from "../../interface";
import { config } from "../../config/env";

const { APP_URL } = config;

export const SignUp = async (payload: ISignUpPayload, device: IDevice) => {
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
    country,
    dob,
    ref,
    slug,
    signupType,
  } = payload;

  const hashedPassword = await hash(password, 10);

  const verification_token = nanoid(6);
  const verification_link = `${APP_URL}/verification-page?tkn=${verification_token}`;

  let has_basic_info;

  if (firstname && lastname && country) {
    has_basic_info = true;
  }

  const user: any = await UserModel.create({
    email,
    password: hashedPassword,
    firstname,
    lastname,
    username,
    has_basic_info,
    country,
    device,
    dob,
    referred_by: ref,
    verification_token,
    signup_type: signupType,
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