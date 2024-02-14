import {
  UpdateUserById,
  DeleteUser,
  GetUserById,
} from "../services/UserService";
import { errorResponse, successResponse } from "../utils/responseHandler";
import {  Request, Response } from "express";

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
    let {
      firstname,
      lastname,
      email,
      } = req.body;

    if (email) {
      email = email.toLowerCase();
    }

    const update = {
      firstname,
      lastname,
      email,
    };
    const response = await UpdateUserById(user._id, update);

    return successResponse(res, 200, "user updated", response);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};


export const adminUpdateUser = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    let {
      email,
      username,
      access_level,
      } = req.body;

    if (email) {
      email = email.toLowerCase();
    }

    const update = {
      email,
      username,
      access_level,
    };
    const response = await UpdateUserById(user_id, update);

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
