import { IUserDocument } from "../../interface";
import UserModel from "../../models/user";

export const GetUserById = async (user_id: string) => {
  const user = (await UserModel.findById(user_id)
    .select(
      "-__v -refresh_token -is_deleted -access_level -is_active -verification_token -verification_token_expires -createdAt -updatedAt -password"
    )
    .exec()) as IUserDocument;

  return user;
};
