import { compare } from "bcryptjs";
import UserModel from "../../models/user";
import { SignToken } from "./SignToken";

export const Login = async (
  email: string,
  password: string,
) => {
  const user: any = await UserModel.findOne({ email })
    .select("-__v -refresh_token")
    .exec();

  if (!user.password || !(await compare(password, user.password))) {
    return { error: true, message: "Invalid Credentials" };
  }

  const userWithToken = await SignToken({
    _id: user._id,
    access_level: user.access_level,
   });

  return { error: false, data: userWithToken, message: "success" };
};
