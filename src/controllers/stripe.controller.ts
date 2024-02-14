import { body } from "express-validator";
import Stripe from "../services/StripeService/Stripe";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { Request, Response } from "express";

export const stripeValidationRules = (method: string) => {
  switch (method) {
    default:
    case "charge":
      return [
        body("source").isString(),
        body("amount").isNumeric(),
        body("metadata").isObject(),
      ];
  }
};

export const charge = async (req: Request, res: Response) => {
  try {
    const { source, amount, metadata, currency } = req.body;

    const charge = await Stripe.charges.create({
      amount,
      currency,
      source,
      metadata,
    });

    return successResponse(res, 200, "success", charge);
  } catch (error: any) {
    return errorResponse(res, error.statusCode || 500, error);
  }
};
