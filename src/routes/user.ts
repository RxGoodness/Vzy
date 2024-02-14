import { Router } from "express";
import {
  updateUser,
  deleteUser,
  getOneUser,
  getUserById,
  adminUpdateUser
  } from "../controllers/user.controller";

import bodyValidator from "../utils/bodyValidator";
import { auth, isAdmin, userValidationRules } from "../middlewares";

const router = Router();

router.put(
  "/",
  auth,
  userValidationRules(),
  bodyValidator,
  updateUser
);

router.patch(
  "/:user_id",
  auth,
  isAdmin,
  userValidationRules(),
  bodyValidator,
  adminUpdateUser
);

router.delete("/:user_id", auth, isAdmin, deleteUser);

router.get("/", auth, getUserById);

router.get("/services/:user_id", getOneUser);

export default router;
