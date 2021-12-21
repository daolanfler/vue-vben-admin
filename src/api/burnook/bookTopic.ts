import { defHttp } from '../../utils/http/axios';
import {
  BookTopicParams,
  BurnBookTopicPageResult,
  BurnBookTopicAdd,
  BurnBookTopicUpdate,
} from './model/bookTopicModel';
import { useDataToItems } from './utils';

enum Api {
  BookTopics = '/v1/book-topics',
}

export const getBookTopicList = async (params: BookTopicParams) => {
  return defHttp.get<BurnBookTopicPageResult>({ url: Api.BookTopics, params }).then((data) => {
    return useDataToItems(data);
  });
};

export const updateBookTopic = (id: number, postData: Omit<BurnBookTopicUpdate, 'id'>) => {
  return defHttp.put({ url: `${Api.BookTopics}/${id}`, data: postData });
};

export const addBookTopic = (data: BurnBookTopicAdd) => {
  return defHttp.post({ url: `${Api.BookTopics}`, data });
};

export const deleteBookTopic = (id: number) => {
  return defHttp.delete({ url: `${Api.BookTopics}/${id}` });
};
