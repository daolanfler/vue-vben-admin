import { Overwrite } from '../../../types/utils';

export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}

export interface BurnPaginationResult<T> {
  data: T[];
  message: string;
  has_next: boolean;
  has_prev: boolean;
  next_num: number;
  page: number;
  prev_num: number;
  total: number;
}

export type BurnPaginationResultItems<T> = Overwrite<
  BurnPaginationResult<T>,
  { data?: T[]; items: T[] }
>;
