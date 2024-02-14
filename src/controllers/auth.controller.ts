import {
  Login,
  SignToken,
  SignUp,
} from "../services/AuthService"
import { GetUserByUsername, UserExists } from "../services/UserService";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { Request, Response } from "express";
import { config } from "../config/env";
import { IUserWithToken } from "../interface";
import { verify } from "jsonwebtoken";
import { IUserAuthInfoRequest } from "../interface";

const { JWT_SECRET, REFRESH_TOKEN_SECRET } = config;

export const isValidToken = async (req: Request, res: Response) => {
  try {
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

    verify(token, JWT_SECRET as string, (err: any, decoded: any) => {
      if (err) return errorResponse(res, 403, "Token invalid or expired");
      let user = decoded as IUserAuthInfoRequest;
      return successResponse(res, 200, "validity of token", user);
    });
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {

    let { email, password, firstname, lastname, username } =
      req.body;

    email = email.toLowerCase();
    
    username = username.toLowerCase();

    if (await UserExists({ email })) {
      return errorResponse(res, 409, "Email address already taken");
    }

    if (await GetUserByUsername(username)) {
      return errorResponse(res, 409, "Username already taken");
    }

    let response = await SignUp(
      {
        email,
        password,
        firstname,
        lastname,
        username,
       }
    );

    return successResponse(res, 201, "signed up", response);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase();

    if (!(await UserExists({ email }))) {
      return errorResponse(res, 404, "Invalid credentials");
    }

    const response = await Login(email, password);

    if (response.error) {
      return errorResponse(res, 400, response.message);
    }

    let user = response.data as IUserWithToken;

    return successResponse(res, 200, "login successful details", {
      user,
    });
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const userExists = async (req: Request, res: Response) => {
  try {
    let { email } = req.query;

    email = email?.toString().toLowerCase();

    const response = await UserExists({ email: email || "" });

    return successResponse(res, 200, "user's existence details", response);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {

    const { refreshToken } = req.params;
    if (!refreshToken) return errorResponse(res, 404, "No refresh token found");

    verify(
      refreshToken,
      REFRESH_TOKEN_SECRET as string,
      async (err: any, decoded: any) => {
        if (err) return errorResponse(res, 403, "invalid token");
        let user = decoded as IUserAuthInfoRequest;
        const { _id, access_level } = user
        const response = await SignToken({_id, access_level });
        return successResponse(res, 200, "refresh token", response);
      }
    );
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};
