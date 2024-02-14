import UserModel from "../../models/user";
import { compare } from "bcryptjs";

export const ComparePasswords = async (password: string, user_id: string) => {
  const user = await UserModel.findById(user_id).select("password");

  return await compare(password, user!.password!);
};
