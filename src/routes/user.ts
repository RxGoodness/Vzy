import { Router } from "express";
import {
  get_user_with_token,
  updateUser,
  userValidationRules,
  deleteUser,
  getOneUser,
  } from "../controllers/user.controller";

import bodyValidator from "../utils/bodyValidator";
import { auth, isAdmin,  } from "../middlewares/auth";

const router = Router();

// router.get("/user", auth, getUser);
router.get("/user/auth", get_user_with_token);

router.patch(
  "/",
  auth,
  userValidationRules(),
  bodyValidator,
  updateUser
);

router.get("/:user_id", auth, getOneUser);

router.get("/services/:user_id", getOneUser);

export default router;
