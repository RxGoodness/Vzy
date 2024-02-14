import { GetUser } from "../services/UserService";
import { IUserAuthInfoRequest } from "../interface";
import { body, query } from "express-validator";
import {
  UpdateUserById,
  DeleteUser,
  GetUserById,
} from "../services/UserService";
import { errorResponse, successResponse } from "../utils/responseHandler";
import {  Request, Response } from "express";

export const userValidationRules = (action?: string) => {
  switch (action) {
    case "payout":
      return body("type").isString();
    case "delete_many":
      return query("users", "Must be comma-seperated list of users id").matches(
        /^(\w+,)*(\w+)$/g
      );
    default:
      return [
        body(["firstname", "lastname", "country"]).optional().isString().optional(),
        body("email").optional().isEmail(),
        body("dob").optional().isDate(),
        body("has_basic_info").optional().isBoolean(),
        body("categories").optional().isArray({ min: 1 }),
        body("access_level", "Must be between 1 and 3")
          .optional()
          .isFloat({ min: 1, max: 3 }),
      ];
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { user_id } = req.params;

    if (user._id !== user_id && user.access_level < 2) {
      return errorResponse(res, 401, "Unauthorized");
    }

    let response = await GetUserById(user_id);

    return successResponse(res, 200, "user details", response);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    // const { user_id } = req.params;
    let {
      firstname,
      lastname,
      username,
      email,
      access_level,
      } = req.body;

    if (email) {
      email = email.toLowerCase();
    }

    // only admin can make another user an admin
    if (access_level && user.access_level < 3) {
      return errorResponse(res, 401, "Unauthorized, only admin can make another user an admin");
    }

    const update = {
      firstname,
      lastname,
      username,
      email,
      access_level,
    };
    const response = await UpdateUserById(user._id, update);

    return successResponse(res, 200, "user updated", response);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { user } = req;

    let response = await GetUserById(user._id);

    return successResponse(res, 200, "user details", response);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { user_id } = req.params;

    if (user.access_level < 2) {
      return errorResponse(res, 401, "Unauthorized");
    }

    const response = await DeleteUser(user_id);

    return successResponse(res, 200, "user deleted", response);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};
