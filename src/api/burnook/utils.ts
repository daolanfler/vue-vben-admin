import { BurnPaginationResult, BurnPaginationResultItems } from '../model/baseModel';
// import { del } from '/@/components/Form/src/componentMap';

export const useDataToItems = <T>(result: BurnPaginationResult<T>) => {
  const copy: BurnPaginationResultItems<T> = {
    ...result,
    items: result.data,
  };
  delete copy.data;
  return copy as BurnPaginationResultItems<T> & { data: undefined };
};
