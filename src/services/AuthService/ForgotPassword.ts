import { addMinutes } from "date-fns";
import { nanoid } from "nanoid";
import UserModel from "../../models/user";


// const { APP_URL } = config;

export const ForgotPassword = async (email: string) => {
  const token = nanoid(6);
  // const link = `${APP_URL as string}/reset-password?tkn=${token}`;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return { error: true, code: 400, message: "Email address incorrect" };
  }

  // send password reset email
  // SendEmailFromTemplate({
  //   template: "password_reset",
  //   to: email,
  //   locals: {
  //     link,
  //     name: user.firstname ? user.firstname : user.email.split("@")[0],
  //   },
  // });

  user.verification_token = token;
  user.token_validity = addMinutes(Date.now(), 5);

  const newUser = await user.save();

  return { error: false, data: newUser };
};
