import { Document } from "mongoose";
import { TAsc, TDes } from "./filter.interface";
import { IUserDocument } from "./user.interface";

export interface ITransactionMetadata {
  [key: string]: any;
  name?: string;
  email?: string;
  message?: string;
  quantity?: number;
  unit?: string;
  type?: string;
  image?: string;
  product_id?: string;
  productName?: string;
  firstname?: string;
  lastname?: string;
  phone_number?: string;
  country?: string;
  actual_price?: string;
  transaction_fee?: string;
  due_date?: Date;
  user: string;
 }

export interface ITransaction {
  amount?: number;
  dollar_amount?: number;
  final_amount?: number;
  local_final_amount?: number;
  description?: string;
  reference?: string;
  user: IUserDocument | string;
  payment_reference?: string;
  currency?: string;
  metadata?: ITransactionMetadata;
  dollar_exchange_rate?: number;
  percentage_cut?: number;
  balance_before?: number;
  balance_after?: number;
  paid_at?: Date | string | number;
  user_ref?: string;
  status?: string;
  type?: string;
}

export interface IChargePayload {
  customer?: string;
  amount: number;
  currency: string;
  source?: string;
  reference: string;
  metadata: ITransactionMetadata;
  id?: string;
  created?: string;
  payment_method?: string;
  amount_paid?: number;
  subscription?: string;
}

export interface ITransactionExportOptions {
  sort: { createdAt: TAsc | TDes };
  account: string;
  from: Date;
  to: Date;
  type?: string;
}

export interface ITransactionDocument extends ITransaction, Document {}