import { Router } from "express";
import {
  login,
  signUp,
  validateRequestBody,
  userExists,
  changePassword,
  forgotPassword,
  resetPassword,
  isValidToken,
  emailAuth,
} from "../controllers/auth.controller";
import { auth } from "../middlewares/auth";
import validateBody from "../utils/bodyValidator";

const router = Router();


router.get("/is-valid-token", isValidToken);

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

router.put(
  "/change-password",
  auth,
  validateRequestBody("change_password"),
  validateBody,
  changePassword
);


router.post(
  "/forgot-password",
  validateRequestBody("forgot_password"),
  validateBody,
  forgotPassword
);

router.post(
  "/reset-password",
  validateRequestBody("reset_password"),
  validateBody,
  resetPassword
);


router.get(
  "/user-exists",
  validateRequestBody("user_exists"),
  validateBody,
  userExists
);

router.post(
  "/email-auth",
  validateRequestBody("is_email"),
  validateBody,
  emailAuth
);


export default router;
