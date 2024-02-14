import { hash, compare } from "bcryptjs";
import UserModel from "../../models/user";
// import { SendEmailFromTemplate } from "../Utility";

export const ChangePassword = async (
  password: string,
  new_password: string,
  user_id: string
) => {
  const user: any = await UserModel.findById(user_id);

  if (!(await compare(password, user.password))) {
    throw new Error("Incorrect password");
  }

  const newPassword = await hash(new_password, 10);
  user.password = newPassword;

  const newUser = await user.save();

  // send password changed email
  
  // SendEmailFromTemplate({
  //   template: "password_changed",
  //   to: user.email,
  //   locals: {
  //     name: user.firstname ? user.firstname : user.email.split("@")[0],
  //   },
  // });

  return newUser;
};
