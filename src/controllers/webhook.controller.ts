import crypto from "crypto";
import { errorResponse } from "../utils/responseHandler";
import { config } from "../config/env";
import { Request, Response } from "express";
import Stripe from "../services/StripeService/Stripe";

import { ICustomObject, IChargePayload, EUserStatus } from "../interface";
import { UpdateUserById } from "../services/UserService";

const {
  STRIPE_WEBHOOK_SECRET,
  } = config;

export const stripeWebhook = async (req: Request, res: Response) => {
  try {
    let event;
    try {
      event = Stripe.webhooks.constructEvent(
        req.body,
        req.headers["stripe-signature"] as string,
        STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    const data = event.data.object as ICustomObject;
    const { metadata } = data;

    switch (event.type) {
      case "charge.succeeded":
        const paymentDetails = event.data.object as unknown as IChargePayload;
        await UpdateUserById(paymentDetails.metadata.user, { status: EUserStatus.PAID })
        break;
          case "charge.failed":
        break;
      default:
        break;
    }

    return res.sendStatus(200);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};
