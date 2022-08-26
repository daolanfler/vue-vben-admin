import { BasicPageParams, BurnPaginationResult } from '../../model/baseModel';

export interface BurnBookItem {
  id: number;
  name: string;
}

export type BurnBookListParams = Pick<BasicPageParams, 'page'>;

export type BurnBookListResultModel = BurnPaginationResult<BurnBookItem>;

// Generated by https://quicktype.io

export interface BurnBookDetail {
  id: number;
  oid: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  name: string;
  detail: string;
  author_id: null;
  gov_banned: boolean;
  documents: BurnDocument[];
  author: Author;
}

export interface Author {
  id: number;
  oid: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  name: string;
  dynasty: string;
  detail: string;
}

export interface BurnDocument {
  id: number;
  title: string;
}