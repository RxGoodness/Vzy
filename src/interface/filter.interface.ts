import { ObjectId } from "mongodb";

export type TDes = -1;
export type TAsc = 1;

export const sortAsc: TAsc = 1;
export const sortDes: TDes = -1;

export interface IRegExp {
  $regex: RegExp;
}

export interface ISort {
  [key: string]: TDes | TAsc;
}

export interface IFilterQuery {
  [key: string]: any;
  account?: string | IRegExp | ObjectId;
  is_active?: boolean;
  status?: string;
}

export interface IFilterOptions {
  limit: number;
  page: number;
  sort?: ISort;
  select?: string;
}

export interface IFilterInviteOptions {
  inviteType?: string;
  tribeId?: string;
}
export interface IDateFilter {
  from: Date | null;
  to: Date;
}
