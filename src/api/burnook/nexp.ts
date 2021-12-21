import { BurnNexpCatePageResult, BurnNexpPageResult } from './model/nexpModel';
import { useDataToItems } from './utils';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  NexpCate = '/v1/nexp-cates',
  Nexp = '/v1/nexp',
}

export const getNexpCateList = async (params: { page: number }) => {
  return defHttp.get<BurnNexpCatePageResult>({ url: `${Api.NexpCate}`, params }).then((data) => {
    return useDataToItems(data);
  });
};

export const getNexpList = async (params: { page: number; keyword: string }) => {
  return defHttp.get<BurnNexpPageResult>({ url: `${Api.Nexp}`, params }).then((data) => {
    return useDataToItems(data);
  });
};
