import { body, query } from "express-validator";

export const validateRequestBody = (action?: string) => {
  switch (action) {
    case "local_login":
      return [
        body("email").isEmail(),
        body("password", "invalid credentials").exists({
          checkFalsy: true,
          checkNull: true,
        }),
      ];
    case "user_exists":
      return query("email").isEmail();
    default:
      return [
        body("email").isEmail(),
        body("password").isString(),
        body(["firstname", "lastname"]).optional().isString(),
        body("username", "Selected slug is invalid").matches(
          /^[a-zA-Z_][a-zA-Z0-9_]{2,24}$/
        ).optional(),
      ];
  }
};
