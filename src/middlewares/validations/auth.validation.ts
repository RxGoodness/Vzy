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
        body("password", "Password must be at least 6 characters and contain at least one alphabet and one digit")
            .isString()
            .isLength({ min: 6 })
            .matches(/[a-zA-Z]/).withMessage('Password must contain at least one alphabet')
            .matches(/\d/).withMessage('Password must contain at least one digit'),
        body(["firstname", "lastname"]).optional().isString(),
        body("username", "Username must start with a letter or underscore, be between 3 and 25 characters long, and contain no spaces")
            .isString()
            .isLength({ min: 3, max: 25 })
            .matches(/^[a-zA-Z_][a-zA-Z0-9_]{1,24}$/)
            .withMessage('Username must start with a letter or underscore and be between 3 and 25 characters long, and contain no spaces')
      ];
  }
};
