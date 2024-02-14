import UserModel from "../../models/user";

export const GetUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({
    email,
  })
    .select(
      "-__v -refresh_token -is_deleted -access_level -is_active -verification_token -verification_token_expires -createdAt -updatedAt -mfa_secret"
    )
    .exec();

  return user;
};
