import UserModel from "../../models/user";
import { IFilterOptions, ISort } from "../../interface";

export const GetAllUsers = async (
  query: {},
  options: Pick<IFilterOptions, "page" | "limit"> & { sort: ISort }
) => {
  const { page, limit, sort } = options;

  const users = await UserModel.aggregate([
    {
      $match: {
        ...query,
      },
    },
    {
      $lookup: {
        from: "wallets",
        localField: "_id",
        foreignField: "user",
        as: "wallet",
      },
    },
    {
      $sort: sort,
    },
  ]);

  const total_documents = await UserModel.countDocuments(query);

  return {
    page,
    limit,
    total_documents,
    users,
  };
};
