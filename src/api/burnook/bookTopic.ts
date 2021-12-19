import { defHttp } from '../../utils/http/axios';
import {
  BookTopicParams,
  BurnBookPageListResultItemsModel,
  BurnBookPageListResultModel,
  BurnBookTopicUpdate,
} from './model/bookTopicModel';

enum Api {
  BookTopics = '/v1/book-topics',
}

export const getBookTopicList = (params: BookTopicParams) => {
  return defHttp.get<BurnBookPageListResultModel>({ url: Api.BookTopics, params }).then((data) => {
    const dataCopy: BurnBookPageListResultItemsModel = {
      ...data,
      items: data.data,
    };
    delete dataCopy.data;
    return dataCopy;
  });
};

export const updateBookTopic = (id: number, postData: Omit<BurnBookTopicUpdate, 'id'>) => {
  return defHttp.put({ url: `${Api.BookTopics}/${id}`, data: postData });
};
