// Generated by https://quicktype.io

import {
  BasicPageParams,
  BurnPaginationResult,
  BurnPaginationResultItems,
} from '../../model/baseModel';

export interface BurnBookTopicItem {
  id: number;
  oid: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  name: string;
  book_ids: number[];
  cate_id: number;
}

export type BookTopicParams = Pick<BasicPageParams, 'page'>;

export type BurnBookPageListResultModel = BurnPaginationResult<BurnBookTopicItem>;
export type BurnBookPageListResultItemsModel = BurnPaginationResultItems<BurnBookTopicItem>;
