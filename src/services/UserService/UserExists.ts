import { FilterQuery, UpdateQuery } from "mongoose";
import UserModel from "../../models/user";
import { IUser } from "../../interface";

/**
 * @description checks if a user exists with email or password
 * @param {string} email email address or username of user
 */
export const UserExists = async (filter: { [key: string]: string }) => {
  const userExists = await UserModel.exists(filter);

  return userExists;
};

export const GetUser = async (
  filter: FilterQuery<IUser>,
  select_filter = "-__v -refresh_token -is_deleted -access_level -is_active -verification_token -verification_token_expires -createdAt -updatedAt -password"
) => {
  try {
    const users = await UserModel.find(filter).select(select_filter).exec();
    return { data: users, success: true, status: 200 };
  } catch (error: any) {
    return { success: false, message: error.message, status: 500 };
  }
};

export const FindUser = async (filter: FilterQuery<IUser>) => {
  return await UserModel.findOne(filter);
};

export const UpdateUser = async (
  filter: FilterQuery<IUser>,
  update: UpdateQuery<IUser>
) => {
  return await UserModel.findOneAndUpdate(filter, update, {
    new: true,
    runValidators: true,
  });
};
