import Joi from 'joi';

export const validateAuthRequestBody = (action?: string) => (
  action === "is_valid_slug" ? 
    Joi.object({ slug: Joi.string().required() }) :
  action === "local_login" ?
    Joi.array().items(
      Joi.object({ email: Joi.string().email() }),
      Joi.object({ password: Joi.string().exist() }),
      Joi.object({ device: Joi.object().optional() })
    ) :
  action === "user_exist" ?
    Joi.object({ email: Joi.string().email().required() }) :
  action === "google_callback" ?
    Joi.object({ code: Joi.string().required() }) :
  action === "change_password" ?
    Joi.array().items(
      Joi.object({ old_password: Joi.string().required() }),
      Joi.object({ new_password: Joi.string().required() }),
      Joi.object({ confirm_password: Joi.string().required() })
    ) :
  action === "verify_email" ?
    Joi.object({ tkn: Joi.string().length(10).required() }) :
  action === "send_verification" ?
    Joi.object({ email: Joi.string().email().required() }) :
  action === "forgot_password" ?
    Joi.object({ email: Joi.string().email().required() }) :
  action === "reset_password" ?
    Joi.object({ tkn: Joi.string().length(10).required() }) :
  action === "mailchimp_callback" ?
    Joi.array().items(
      Joi.object({ code: Joi.string().required() }),
      Joi.object({ account_id: Joi.string().hex().length(24).required() })
    ) :
  action === "social_signup" ?
    Joi.array().items(
      Joi.object({ email: Joi.string().email().required() }),
      Joi.object({ firstname: Joi.string().required() }),
      Joi.object({ lastname: Joi.string().required() }),
      Joi.object({ picture: Joi.object().optional() }),
      Joi.object({ google: Joi.object().optional() }),
      Joi.object({ facebook: Joi.object().optional() }),
      Joi.object({ instagram: Joi.object().optional() }),
      Joi.object({ slug: Joi.string().min(3).max(25).required() }),
      Joi.object({ device: Joi.object().required() })
    ) :
  action === "calendly_callback" ?
    Joi.array().items(
      Joi.object({ code: Joi.string().required() }),
      Joi.object({ account_id: Joi.string().hex().length(24).required() })
    ) :
  action === "kyc" ?
    Joi.array().items(
      Joi.object({ doc_type: Joi.string().required() }),
      Joi.object({ doc_country: Joi.string().required() }),
      Joi.object({ address: Joi.string().required() }),
      Joi.object({ gender: Joi.string().required() }),
      Joi.object({ phone_num: Joi.string().required() }),
      Joi.object({ doc_image: Joi.string().base64().required() })
    ) :
  action === "kyc-verification-init" ?
    Joi.array().items(
      Joi.object({ verification_session_id: Joi.string().required() }),
      Joi.object({ address: Joi.string().required() }),
      Joi.object({ gender: Joi.string().required() }),
      Joi.object({ phone_num: Joi.string().required() })
    ) :
  Joi.array().items(
    Joi.object({ email: Joi.string().email().required() }),
    Joi.object({ password: Joi.string().required() }),
    Joi.object({ firstname: Joi.string().optional() }),
    Joi.object({ lastname: Joi.string().optional() }),
    Joi.object({ country: Joi.string().optional() }),
    Joi.object({ slug: Joi.string().regex(/^[a-zA-Z_][a-zA-Z0-9_]{2,24}$/).required() })
  )
);
