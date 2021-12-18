import { BurnBookItem } from './model/bookModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  BookItems = '/v1/fetch-books-by-name',
}

export const getBookList = () => {
  return defHttp.get<BurnBookItem[]>({ url: Api.BookItems });
};
