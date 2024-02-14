import { differenceInMinutes } from "date-fns";
import { hash } from "bcryptjs";
import UserModel from "../../models/user";

// import { SendEmailFromTemplate } from "../Utility";


export const ResetPassword = async (token: string, password: string) => {
  const user: any = await UserModel.findOne({
    verification_token: token,
  })
    .select("-__v -refresh_token ")
    .exec();

  if (!user) {
    return {
      error: true,
      code: 400,
      message: "Link has expired or is invalid",
    };
  }

  if (differenceInMinutes(user.token_validity, Date.now()) > 5) {
    return {
      error: true,
      code: 400,
      message: "Link has expired or is invalid",
    };
  }

  const newPassword = await hash(password, 10);
  const newUser = await UserModel.findOneAndUpdate(
    { verification_token: token },
    { $set: { password: newPassword } },
    { new: true }
  );

  // send password changed email
  // SendEmailFromTemplate({
  //   template: "password_changed",
  //   to: user.email,
  //   locals: {
  //     name: user.firstname ? user.firstname : user.email.split("@")[0],
  //   },
  // });

  return { error: false, data: newUser, message:"password changed" };
};
