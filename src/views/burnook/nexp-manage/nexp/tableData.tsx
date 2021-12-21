import { BasicColumn } from '../../../../components/Table';
import { BurnNexpItem } from '/@/api/burnook/model/nexpModel';

export function getNexpColumns(): BasicColumn[] {
  return [
    {
      title: '名称',
      dataIndex: 'name',
    },

    {
      title: '类别',
      dataIndex: 'cate_id',
      customRender: ({ record }) => {
        return (record as BurnNexpItem).cate.name;
      },
    },
    // {
    //   title: '创建时间',
    //   dataIndex: 'created_at',
    //   customRender: ({ record }) =>
    //     formatToDateTime((record as BurnNexpItem).created_at, undefined, true),
    // },
    // {
    //   title: '更新时间',
    //   dataIndex: 'updated_at',
    //   customRender: ({ record }) =>
    //     formatToDateTime((record as BurnNexpItem).updated_at, undefined, true),
    // },
  ];
}
