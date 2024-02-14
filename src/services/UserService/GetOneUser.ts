import UserModel from "../../models/user";

export const GetOneUser = async (query: {}) => {
  const user = await UserModel.findOne(query);

  return user;
};
