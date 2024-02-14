import { Request, Response, NextFunction } from "express";
import { IUserAuthInfoRequest } from "../interface";
import { verify } from "jsonwebtoken";
import { errorResponse } from "../utils/responseHandler";
import { config } from "../config/env";

const { JWT_SECRET } = config;

export const auth = (req: Request, res: Response, next: NextFunction) => {
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

    req.user = decoded as IUserAuthInfoRequest;
    return next();
  });
};


export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req;

  // super admin has access level of 3
  if (user.access_level < 2) return errorResponse(res, 401, "Unauthorized");

  return next();
};
