import { defHttp } from '../../utils/http/axios';
import {
  BookTopicParams,
  BurnBookTopicListResultItemsModel,
  BurnBookTopicListResultModel,
  BurnBookTopicAdd,
  BurnBookTopicUpdate,
} from './model/bookTopicModel';

enum Api {
  BookTopics = '/v1/book-topics',
}

export const getBookTopicList = async (params: BookTopicParams) => {
  return defHttp.get<BurnBookTopicListResultModel>({ url: Api.BookTopics, params }).then((data) => {
    const dataCopy: BurnBookTopicListResultItemsModel = {
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

export const addBookTopic = (data: BurnBookTopicAdd) => {
  return defHttp.post({ url: `${Api.BookTopics}`, data });
};
