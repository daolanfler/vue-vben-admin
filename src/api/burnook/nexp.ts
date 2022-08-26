import {
  BurnNexpAdd,
  BurnNexpCateItem,
  BurnNexpCatePageResult,
  BurnNexpDetail,
  BurnNexpPageResult,
} from './model/nexpModel';
import { useDataToItems } from './utils';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  NexpCate = '/v1/nexp-cates',
  Nexp = '/v1/nexps',
}

export const getNexpCateList = async (params: { page: number }) => {
  return defHttp.get<BurnNexpCatePageResult>({ url: `${Api.NexpCate}`, params }).then((data) => {
    return useDataToItems(data);
  });
};

export const addNexpCate = async (data: { name: string }) => {
  return defHttp.post<BurnNexpCateItem>({ url: `${Api.NexpCate}`, data });
};

export const updateNexpCate = async (id: number, data: { name: string }) => {
  return defHttp.put<BurnNexpCateItem>({ url: `${Api.NexpCate}/${id}`, data });
};

export const deleteNexpCate = async (id: number) => {
  return defHttp.delete({ url: `${Api.NexpCate}/${id}` });
};

// 名词
export const getNexpList = async (params: { page: number; keyword: string }) => {
  return defHttp.get<BurnNexpPageResult>({ url: `${Api.Nexp}`, params }).then((data) => {
    return useDataToItems(data);
  });
};

export const getNexpDetail = async (id: number) => {
  return defHttp.get<BurnNexpDetail>({
    url: `${Api.Nexp}/${id}`,
  });
};

export const addNexp = async (data: BurnNexpAdd) => {
  return defHttp.post({ url: `${Api.Nexp}`, data });
};

export const updateNexp = async (id: number, data: BurnNexpAdd) => {
  return defHttp.put({ url: `${Api.Nexp}/${id}`, data });
};

export const deleteNexp = async (id: number) => {
  return defHttp.delete({ url: `${Api.Nexp}/${id}` });
};
