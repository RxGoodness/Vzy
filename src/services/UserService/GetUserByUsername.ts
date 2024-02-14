import UserModel from "../../models/user";

export const GetUserByUsername = async (username: string) => {
  const user: any = await UserModel.findOne({ username });

  return user;
};
