import { body } from "express-validator";

export const userValidationRules = (action?: string) => {
  switch (action) {
    case "admin_update_user":
      return [
        body(
          "username",
          "Username must start with a letter or underscore, be between 3 and 25 characters long, and contain no spaces"
        )
          .isString()
          .isLength({ min: 3, max: 25 })
          .matches(/^[a-zA-Z_][a-zA-Z0-9_]{1,24}$/)
          .withMessage(
            "Username must start with a letter or underscore and be between 3 and 25 characters long, and contain no spaces"
          )
          .optional(),
        body("email").optional().isEmail(),
        body("access_level", "Must be between 1 and 3")
          .optional()
          .isFloat({ min: 1, max: 3 }),
      ];
    default:
      return [
        body(["firstname", "lastname"]).optional().isString().optional(),
        ];
  }
};
