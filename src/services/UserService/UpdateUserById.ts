import UserModel from "../../models/user";
import { IUserDocument, IUserUpdate } from "../../interface";
import { nanoid } from "nanoid";
import { config } from "../../config/env";
// import { SendEmailFromTemplate } from "../../services/Utility";

const { APP_URL } = config;

export const UpdateUserById = async (user_id: string, update: IUserUpdate) => {
  const user = (await UserModel.findByIdAndUpdate(user_id, update, {
    new: true,
  })
    .select(
      "-__v -refresh_token -is_deleted -access_level -is_active -verification_token -verification_token_expires -createdAt -updatedAt -password"
    )
    .exec()) as IUserDocument;

  if (update.email) {
    const verification_token = nanoid(6);

    user.verification_token = verification_token;
    await user.save();

    // SendEmailFromTemplate({
    //   template: "verification",
    //   to: update.email as string,
    //   locals: {
    //     link: `${APP_URL}/verification-page?tkn=${verification_token}`,
    //     name: user.firstname,
    //   },
    // });
  }

  return user;
};
