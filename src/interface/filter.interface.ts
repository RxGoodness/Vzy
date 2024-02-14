import { ObjectId } from "mongodb";

export type TDes = -1;
export type TAsc = 1;

export const sortAsc: TAsc = 1;
export const sortDes: TDes = -1;

interface I_Split {
  $in: string | string[];
}

export interface IRegExp {
  $regex: RegExp;
}

export interface ISort {
  [key: string]: TDes | TAsc;
}

export interface IFilterQuery {
  [key: string]: any;
  account?: string | IRegExp | ObjectId;
  title?: IRegExp;
  is_active?: boolean;
  tribe?: string;
  is_approved?: boolean;
  categories?: IRegExp | I_Split;
  name?: IRegExp;
  company_name?: string | IRegExp;
  structure?: string;
  status?: string;
  referred_by?: string;
}

export interface IFilterOptions {
  limit: number;
  page: number;
  account?: string;
  sort?: ISort;
  select?: string;
}

export interface IFilterInviteOptions {
  inviteType?: string;
  tribeId?: string;
}

export interface IFilterShareBusiness {
  account_name?: string;
  slug?: string;
  link?: string;
  page_type?: string;
  masterclass?: string;
  product?: string;
}
export interface IDateFilter {
  from: Date | null;
  to: Date;
}
