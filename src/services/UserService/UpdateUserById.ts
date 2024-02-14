import UserModel from "../../models/user";
import { IUserDocument, IUserUpdate } from "../../interface";
import { config } from "../../config/env";

const { APP_URL } = config;

export const UpdateUserById = async (user_id: string, update: IUserUpdate) => {
  const user = (await UserModel.findByIdAndUpdate(user_id, update, {
    new: true,
  })
    .select(
      "-__v -refresh_token -is_deleted -is_active -createdAt -updatedAt -password"
    )
    .exec()) as IUserDocument;

  return user;
};
