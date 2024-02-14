import { Router } from "express";
import {
  updateUser,
  deleteUser,
  getOneUser,
  getUserById
  } from "../controllers/user.controller";

import bodyValidator from "../utils/bodyValidator";
import { auth, isAdmin, userValidationRules } from "../middlewares";

const router = Router();

router.patch(
  "/",
  auth,
  userValidationRules(),
  bodyValidator,
  updateUser
);

router.delete("/:user_id", auth, isAdmin, deleteUser);

router.get("/", auth, getUserById);

router.get("/services/:user_id", getOneUser);

export default router;
