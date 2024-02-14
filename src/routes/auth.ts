import { Router } from "express";
import {
  login,
  signUp,
  validateRequestBody,
  userExists
} from "../controllers/auth.controller";
import { auth } from "../middlewares/auth";
import validateBody from "../utils/bodyValidator";

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
  "/user-exists",
  validateRequestBody("user_exists"),
  validateBody,
  userExists
);

export default router;
