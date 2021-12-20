import { BurnDocDetail } from './model/docModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  BaseUrl = '/v1/documents',
}

export const getDocDetail = async (id: number) => {
  return defHttp.get<BurnDocDetail>({
    url: `${Api.BaseUrl}/${id}`,
  });
};

export const updateDocDetail = async (
  id: number,
  params: {
    title: string;
    content: string;
  },
) => {
  return defHttp.put({
    url: `${Api.BaseUrl}/${id}`,
    params,
  });
};
