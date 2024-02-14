import { body, query } from "express-validator";
import {
  Login,
  SignUp,
  ChangePassword,
  ForgotPassword,
  ResetPassword,
  EmailAuth,
} from "../services/AuthService"
import { GetUserById, GetUserByUsername, UserExists } from "../services/UserService";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { Request, Response } from "express";
import { config } from "../config/env";
import { IUserWithToken } from "../interface";
import { verify } from "jsonwebtoken";
import { IUserAuthInfoRequest } from "../interface";

const { JWT_SECRET } = config;

export const validateRequestBody = (action?: string) => {
  switch (action) {
    case "is_valid_slug":
      return query("username").isString();
    case "local_login":
      return [
        body("email").isEmail(),
        body("password", "invalid credentials").exists({
          checkFalsy: true,
          checkNull: true,
        }),
      ];
    case "user_exists":
      return query("email").isEmail();
    case "change_password":
      return [
        body(["old_password", "new_password", "confirm_password"]).isString(),
      ];
    case "verify_email":
      return query("tkn", "Invalid token")
        .isString()
        .isLength({ min: 6, max: 6 });
    case "send_verification":
      return body("email").isEmail();
    case "forgot_password":
      return body("email").isEmail();
    case "reset_password":
      return query("tkn", "Invalid token")
        .isString()
        .isLength({ min: 6, max: 6 });
    default:
      return [
        body("email").isEmail(),
        body("password").isString(),
        body(["firstname", "lastname", "country"]).optional().isString(),
        body("username", "Selected slug is invalid").matches(
          /^[a-zA-Z_][a-zA-Z0-9_]{2,24}$/
        ),
      ];
  }
};

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
      if (err) return errorResponse(res, 403, "invalid token");
      let user = decoded as IUserAuthInfoRequest;
      return successResponse(res, 200, "validity of token", user);
    });
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { signupType } = req.query;

    let { email, password, firstname, lastname, country, dob, device, slug, username } =
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
        country,
        dob,
        // ref,
        slug,
        signupType: signupType as string,
      },
      device
    );

    return successResponse(res, 201, "signed up", response);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const isValidSlug = async (req: Request, res: Response) => {
  try {
    let { username } = req.query;
    username = (username as string).toLowerCase();

    const regex = new RegExp(/^[a-zA-Z_][a-zA-Z0-9_]{2,24}$/);

    const response = await GetUserByUsername(username as string);

    if (response) {
      return successResponse(res, 200, "validity of slug", false);
    }

    return successResponse(res, 200, "validity of slug", true);
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

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { old_password, new_password, confirm_password } = req.body;

    if (new_password !== confirm_password) {
      return errorResponse(res, 400, "Passwords do not match");
    }

    const response = await ChangePassword(old_password, new_password, user._id);

    return successResponse(res, 200, response);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    await ForgotPassword(email);

    return successResponse(res, 200, "Password reset email sent");
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { tkn } = req.query;
    const { password } = req.body;

    const response = await ResetPassword(tkn as string, password);

    if (response.error) {
      return errorResponse(res, response.code, response.message);
    }

    return successResponse(res, 200, response.message, response.data);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const emailAuth = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    let email_auth = await EmailAuth(email);
    if (email_auth.error) return errorResponse(res, 400, email_auth.message);
    return successResponse(res, 200, "OTP sent to email address");
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};