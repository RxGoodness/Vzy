import UserModel from "../../models/user";
import { IUserDocument, IUserUpdate } from "../../interface";
import { config } from "../../config/env";

const { APP_URL } = config;

export const UpdateUserById = async (user_id: string, update: IUserUpdate) => {
  const user = (await UserModel.findByIdAndUpdate(user_id, update, {
    new: true,
  })
    .select(
      "-__v -refresh_token -is_deleted -access_level -is_active -verification_token -verification_token_expires -createdAt -updatedAt -password"
    )
    .exec()) as IUserDocument;

  return user;
};
