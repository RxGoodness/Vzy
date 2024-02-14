import { model, Schema } from "mongoose";
import { EUserStatus, IUser, IUserDocument } from "../interface";

const userSchemaFields: Record<keyof IUser, any> = {
  email: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
    lowercase: true,
  },
  password: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  username: { type: String },
  slug: { type: String },
  access_level: { type: Number, default: 1, enum: [1, 2, 3] },
  is_active: { type: Boolean, default: true },
  is_verified: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false },
  verification_token: { type: String },
  token_validity: { type: Date },
  last_login: { type: Date },
  is_user_suspended: { type: Boolean, default: false },
  status: {
    type: String,
    enum: Object.values(EUserStatus),
    default: EUserStatus.PENDING
  },
};

const userSchema: Schema = new Schema(userSchemaFields, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

const UserModel = model<IUserDocument>("user", userSchema);
export default UserModel;
