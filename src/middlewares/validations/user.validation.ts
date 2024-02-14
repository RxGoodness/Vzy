import { body, query } from "express-validator";

export const userValidationRules = (action?: string) => {
    switch (action) {
      case "payout":
        return body("type").isString();
      case "delete_many":
        return query("users", "Must be comma-seperated list of users id").matches(
          /^(\w+,)*(\w+)$/g
        );
      default:
        return [
          body(["firstname", "lastname", "country"]).optional().isString().optional(),
          body("email").optional().isEmail(),
          body("dob").optional().isDate(),
          body("has_basic_info").optional().isBoolean(),
          body("categories").optional().isArray({ min: 1 }),
          body("access_level", "Must be between 1 and 3")
            .optional()
            .isFloat({ min: 1, max: 3 }),
        ];
    }
  };
  