import { customAlphabet } from "nanoid";
// import { SendEmailFromTemplate } from "../../services/Utility";
// import TransactionModel from "../../models/transaction";
import cache from "../../utils/cacheManager";
import { genCode } from "../../utils/codeRandom";

export const EmailAuth = async (email: string) => {
  let code = genCode();
  // let filter = { "metadata.email": email };
  // const transaction = await TransactionModel.findOne(filter);
  // if (!transaction) {
  //   return {
  //     error: true,
  //     code: 400,
  //     message: "No transaction found for email address",
  //   };
  // }
  try {
    let keepCode = await cache.setAsync(`email_auth_otp_${email}`, code, {
      EX: 300,
    });
    if (keepCode !== "OK")
      return { error: true, message: "something went wrong" };
  } catch (error) {
    return { error: true, message: "something went wrong" };
  }
  // SendEmailFromTemplate({
  //   template: "otp",
  //   to: email,
  //   locals: {
  //     code,
  //     action: "purchase history",
  //     name: transaction?.metadata?.name?.split(" ")[0],
  //   },
  // });

  return { error: false, message:'server error', data: {} };
};
