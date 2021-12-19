<template>
  <PageWrapper contentBackground contentClass="flex" dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleReloadCurrent"> 刷新当前页 </a-button>
        <a-button type="primary" @click="handleReload"> 刷新并返回第一页 </a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { getBookTopicList } from '/@/api/burnook/bookTopic';
  import { BasicTable, useTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { getTopicColumns } from './tableData';

  export default defineComponent({
    components: { BasicTable, PageWrapper },
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '古籍主题',
        columns: getTopicColumns(),
        api: getBookTopicList,
        pagination: { pageSize: 20 },
      });
      function handleReloadCurrent() {
        reload();
      }

      function handleReload() {
        reload({
          page: 1,
        });
      }

      return {
        registerTable,
        handleReloadCurrent,
        handleReload,
      };
    },
  });
</script>
