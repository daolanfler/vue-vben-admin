import {
  BurnBookDetail,
  BurnBookItem,
  BurnBookListParams,
  BurnBookListResultModel,
} from './model/bookModel';
import { useDataToItems } from './utils';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  BookItems = '/v1/fetch-books-by-name',
  BaseUrl = 'v1/books',
}

export const getAllBooks = () => {
  return defHttp.get<BurnBookItem[]>({ url: Api.BookItems });
};

export const getBookList = async (params: BurnBookListParams) => {
  return defHttp
    .get<BurnBookListResultModel>({
      url: Api.BaseUrl,
      params,
    })
    .then((data) => {
      return useDataToItems(data);
    });
};

export const getBookDetail = async (id: number) => {
  return defHttp.get<BurnBookDetail>({
    url: `${Api.BaseUrl}/${id}`,
  });
};
