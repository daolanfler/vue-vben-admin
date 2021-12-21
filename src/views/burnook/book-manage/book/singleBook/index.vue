<template>
  <PageWrapper :title="bookName">
    <Description
      size="middle"
      title="书籍信息"
      :bordered="true"
      :column="3"
      :data="bookData"
      :schema="bookSchema"
    />
    <a-divider />
    <BasicTable @register="registerTable">
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
    <EditBookModal @register="registerModal" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref, computed, UnwrapNestedRefs } from 'vue';
  import { useRoute } from 'vue-router';
  import { getBookDetail } from '/@/api/burnook/book';
  import { BurnBookDetail, BurnDocument } from '/@/api/burnook/model/bookModel';
  import { PageWrapper } from '/@/components/Page';
  import { DescItem, Description } from '/@/components/Description/index';
  import { Divider as ADivider } from 'ant-design-vue';
  import { BasicColumn, useTable, BasicTable, TableAction } from '/@/components/Table';
  import EditBookModal from './editDocument.vue';
  import { useModal } from '/@/components/Modal';

  const route = useRoute();
  const detail = ref<BurnBookDetail>();
  const bookName = computed(() => detail.value?.name);
  getBookDetail(parseInt(route.params.id as string)).then((data) => {
    detail.value = data;
  });
  const bookData = computed(() => {
    if (!detail.value) return {};
    return {
      name: detail.value.name,
      authorName: detail.value.author.name || '不详',
      authorDynasty: detail.value.author.dynasty,
      authorDetail: detail.value.author.detail,
      created_at: detail.value.created_at,
      updated_at: detail.value.updated_at,
      gov_banned: detail.value.gov_banned,
    };
  });
  const bookSchema: DescItem[] = [
    {
      field: 'name',
      label: '书名',
    },
    {
      field: 'authorName',
      label: '作者',
    },
    {
      field: 'gov_banned',
      label: '是否被和谐',
    },
    {
      field: 'authorDynasty',
      label: '作者朝代',
    },
    {
      field: 'created_at',
      label: '添加于',
    },
    {
      field: 'updated_at',
      label: '更新于',
    },
    {
      field: 'authorDetail',
      label: '作者详情',
    },
  ];

  const columns: BasicColumn[] = [
    {
      title: '名称',
      dataIndex: 'title',
    },
  ];

  const dataSource = computed(() => {
    return detail.value?.documents || [];
  });

  const [registerTable] = useTable({
    title: '书籍文档',
    dataSource,
    columns,
    pagination: false,
    scroll: { y: 400 },
    showIndexColumn: false,
    actionColumn: {
      width: 160,
      title: '操作',
      dataIndex: 'action',
      slots: {
        customRender: 'action',
      },
    },
  });
  const [registerModal, { openModal }] = useModal();
  const handleEdit = (record: UnwrapNestedRefs<BurnDocument>) => {
    openModal(true, record);
  };
</script>
