import UserModel from "../../models/user";

export const DeleteUser = async (user_id: string) => {
  await UserModel.findByIdAndDelete(user_id);
  
  return true;
};
