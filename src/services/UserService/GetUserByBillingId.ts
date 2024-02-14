import UserModel from "../../models/user";

export const GetUserByBillingId = async (billing_id: string) => {
  const user = await UserModel.findOne({ billing_id })
    .select(
      "-__v -refresh_token -is_deleted -access_level -is_active -verification_token -verification_token_expires -createdAt -updatedAt"
    )
    .exec();

  return user;
};
