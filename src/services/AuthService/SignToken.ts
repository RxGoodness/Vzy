import { sign } from "jsonwebtoken";
import UserModel from "../../models/user";
import { config } from "../../config/env";
import {
  ITokenPayload,
  IUserDocument,
  IUserWithToken,
} from "../../interface";

const { JWT_SECRET, REFRESH_TOKEN_SECRET } = config;

export const SignToken = async (
  payload: ITokenPayload
): Promise<IUserWithToken> => {
  let access_token;
  let refresh_token;
  let user: IUserDocument;

    access_token = sign(payload, JWT_SECRET as string, {
      expiresIn: "1m",
    });

    refresh_token = sign(payload, REFRESH_TOKEN_SECRET as string, {
      expiresIn: "1d",
    });

    user = (await UserModel.findByIdAndUpdate(
      payload._id,
      { refresh_token, last_login: Date.now() },
      { new: true }
    )
      .select(
        "firstname lastname username email  is_email_verified  access_level is_user_suspended"
      )
      .lean()
      .exec()) as IUserDocument;

    if (user.is_user_suspended) {
      throw new Error("User Suspended");
    }

  return { access_token, refresh_token, ...user };
};
