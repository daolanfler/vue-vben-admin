import { BasicColumn } from '../../../components/Table';

export function getTopicColumns(): BasicColumn[] {
  return [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
    },
  ];
}
