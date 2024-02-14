import { GetUser } from "../services/UserService";
import { IUserAuthInfoRequest } from "../interface";
import { verify } from "jsonwebtoken";
import { config } from "../config/env";
const { JWT_SECRET } = config;
import { body, query } from "express-validator";
import {
  UpdateUserById,
  GetAllUsers,
  DeleteUser,
  GetUserById,
} from "../services/UserService";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { NextFunction, Request, Response } from "express";
import { ICustomObject, sortDes } from "../interface";

export const get_user_with_token = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract the token from the Authorization header
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    return errorResponse(res, 403, "request not authenticated");
  }

  // Check if the Authorization header starts with "Bearer "
  const [bearer, token] = authorizationHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return errorResponse(res, 403, "invalid token format");
  }

  verify(token, JWT_SECRET as string, async (err: any, decoded: any) => {
    if (err) return errorResponse(res, 403, "invalid token");
    req.user = decoded as IUserAuthInfoRequest;


    return successResponse(res, 200, "user details", {
      user: decoded,
    });
  });
};

export const userValidationRules = (action?: string) => {
  switch (action) {
    case "payout":
      return body("type").isString();
    case "delete_many":
      return query("users", "Must be comma-seperated list of users id").matches(
        /^(\w+,)*(\w+)$/g
      );
    case "export":
      return [
        query("emails", "must be comma-separated list")
          .isString()
          .matches(
            /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/g
          )
          .optional(),
        query("usernames", "must be comma-separated list")
          .isString()
          .matches(/^(\w+,)*(\w+)$/g)
          .optional(),
        query("is_email_verified").isBoolean().optional(),
      ];

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
    const { user_id } = req.params;
    let {
      firstname,
      lastname,
      username,
      email,
      country,
      categories,
      access_level,
      has_basic_info,
      applicable_titles,
      dob,
      feed,
      is_twofa_enable,
      kyc_review_banner_dismissed,
    } = req.body;

    if (email) {
      email = email.toLowerCase();
    }

    // only user himself or admin can update details
    if (user._id !== user_id && user.access_level < 2) {
      return errorResponse(res, 401, "Unauthorized");
    }

    // only super admin can make another user and admin
    if (access_level && user.access_level < 3) {
      return errorResponse(res, 401, "Unauthorized");
    }

    const update = {
      firstname,
      lastname,
      username,
      email,
      country,
      categories,
      access_level,
      has_basic_info,
      applicable_titles,
      dob,
      feed,
      is_twofa_enable,
      kyc_review_banner_dismissed,
    };
    const response = await UpdateUserById(user_id, update);

    return successResponse(res, 200, "user updated", response);
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
