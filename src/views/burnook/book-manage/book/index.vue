<template>
  <PageWrapper contentBackground contentClass="flex" dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <!-- <a-button type="primary" @click="handleAddBook">添加书籍</a-button> -->
        <a-button type="primary" @click="handleReloadCurrent"> 刷新当前页 </a-button>
        <!-- <a-button type="primary" @click="handleReload"> 刷新并返回第一页 </a-button> -->
      </template>

      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              icon: 'ant-design:edit-outlined',
              onClick: () => handleEdit(record),
            },
          ]"
        />
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { getBookList } from '/@/api/burnook/book';
  import { useTable, TableAction, BasicTable } from '/@/components/Table';
  import { BurnBookItem } from '/@/api/burnook/model/bookModel';
  import { UnwrapNestedRefs } from 'vue';
  import { useRouter } from 'vue-router';

  const [registerTable, { reload }] = useTable({
    title: '书籍列表',
    columns: [
      {
        title: '书籍名称',
        dataIndex: 'name',
      },
    ],
    api: getBookList,
    pagination: { pageSize: 20 },
    actionColumn: {
      width: 160,
      title: '操作',
      dataIndex: 'action',
      slots: {
        customRender: 'action',
      },
    },
  });

  function handleReloadCurrent() {
    reload();
  }
  const router = useRouter();
  const handleEdit = (record: UnwrapNestedRefs<BurnBookItem>) => {
    router.replace({
      name: 'BookItem',
      params: {
        id: record.id,
      },
    });
  };
</script>
