import { Router } from "express";
import {
  charge,
} from "../controllers/stripe.controller";

const router = Router();

router.post(
  "/",
  charge
);

export default router;
