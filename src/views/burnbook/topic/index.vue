<template>
  <PageWrapper contentBackground contentClass="flex" dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleAddTopic">添加主题</a-button>
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
    <EditModal
      :bookList="bookList"
      :currentTopic="editTopic"
      :isEdit="isModalEdit"
      @register="registerEditModal"
      @confirmed="handleReloadCurrent"
    />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, UnwrapNestedRefs } from 'vue';
  import { getBookTopicList } from '/@/api/burnook/bookTopic';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import { getTopicColumns } from './tableData';
  import EditModal from './editModal.vue';
  import { BurnBookItem } from '/@/api/burnook/model/bookModel';
  import { getAllBooks } from '/@/api/burnook/book';
  import { BurnBookTopicItem } from '/@/api/burnook/model/bookTopicModel';

  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction, EditModal },
    setup() {
      const bookList = ref<BurnBookItem[]>([]);
      const isModalEdit = ref(true);
      const [registerTable, { reload }] = useTable({
        title: '古籍主题',
        columns: getTopicColumns(),
        api: getBookTopicList,
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

      const [registerEditModal, { openModal: openEditModal, setModalProps }] = useModal();

      getAllBooks().then((data) => {
        bookList.value = data;
      });

      function handleReloadCurrent() {
        reload();
      }

      function handleReload() {
        reload({
          page: 1,
        });
      }
      const editTopic = ref<BurnBookTopicItem>();
      const handleEdit = (record: UnwrapNestedRefs<BurnBookTopicItem>) => {
        editTopic.value = record;
        isModalEdit.value = true;
        openEditModal(true);
      };
      const handleAddTopic = () => {
        setModalProps({
          title: '添加主题',
        });
        isModalEdit.value = false;
        openEditModal(true);
      };
      return {
        registerTable,
        handleReloadCurrent,
        handleReload,
        handleEdit,
        registerEditModal,
        openEditModal,
        editTopic,
        bookList,
        isModalEdit,
        handleAddTopic,
      };
    },
  });
</script>
