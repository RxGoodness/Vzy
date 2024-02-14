import { Router } from "express";
import {
  updateUser,
  deleteUser,
  getUserById,
  adminUpdateUser,
} from "../controllers/user.controller";
import bodyValidator from "../utils/bodyValidator";
import { auth, isAdmin, userValidationRules } from "../middlewares";

const router = Router();

router.put("/", auth, userValidationRules(), bodyValidator, updateUser);

router.patch(
  "/:user_id",
  auth,
  isAdmin,
  userValidationRules("admin_update_user"),
  bodyValidator,
  adminUpdateUser
);

router.delete("/:user_id", auth, isAdmin, deleteUser);

router.get("/", auth, getUserById);

export default router;
