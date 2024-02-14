import stripe from "stripe";
import {config} from '../../config/env';

const { STRIPE_SECRET_KEY } = config;

const Stripe = new stripe(STRIPE_SECRET_KEY as string, {
  apiVersion: "2020-08-27",
});

export default Stripe;
