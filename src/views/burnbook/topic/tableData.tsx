import { BasicColumn } from '../../../components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

export function getTopicColumns(): BasicColumn[] {
  return [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      customRender: ({ record }) => formatToDateTime(record.created_at, undefined, true),
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      customRender: ({ record }) => formatToDateTime(record.updated_at, undefined, true),
    },
  ];
}
