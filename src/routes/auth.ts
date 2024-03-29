import { Router } from "express";
import {
  login,
  signUp,
  refreshToken
} from "../controllers/auth.controller";
import validateBody from "../utils/bodyValidator";
import { validateRequestBody } from "../middlewares";

const router = Router();

router.post("/signup",
validateRequestBody(),
 validateBody, 
 signUp);

router.post(
  "/login",
  validateRequestBody("local_login"),
  validateBody,
  login
);


router.get(
  "/:refresh_token",
  refreshToken
);

export default router;
