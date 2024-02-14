import { Response } from "express";

export const errorResponse = (
  res: Response,
  statusCode: number = 500,
  message: string,
  warnings?: string[] | string,
  errors?: string[] | string
) => {
  let res_message = errors || message || warnings;

  if (
    statusCode === 500 &&
    process.env.NODE_ENV === ("production" || "staging")
  ) {
    res_message = "Something went wrong";
  }

  return res.status(statusCode).json({
    success: false,
    message: res_message,
    warnings,
    errors,
  }
    );
};

export const successResponse = (
  res: Response,
  statusCode: number = 200,
  message: string,
  data?: any,
  warnings?: string[] | string,
  errors?: string[] | string
) =>
  res.status(statusCode).json({
    success: true,
    message,
    payload: data,
    warnings,
    errors,
  });
