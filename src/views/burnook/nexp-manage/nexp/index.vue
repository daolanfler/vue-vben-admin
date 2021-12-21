<template>
  <PageWrapper contentBackground contentClass="flex" dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-input-search
          v-model:value="keyword"
          placeholder="输入关键词查询"
          style="width: 200px"
          @search="handleReload"
        />
        <a-button type="primary" @click="handleAddNexp">添加名词</a-button>
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
            {
              label: '删除',
              icon: 'ant-design:delete-outlined',
              color: 'error',
              onClick: () => handleDelete(record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <EditModal
      :current-nexp="editNexp"
      :cate-list="cateList"
      :isEdit="isModalEdit"
      @register="registerEditModal"
      @confirmed="handleReloadCurrent"
    />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, UnwrapNestedRefs } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import { getNexpColumns } from './tableData';
  import EditModal from './editModal.vue';
  import { deleteNexp, getNexpCateList, getNexpList } from '/@/api/burnook/nexp';
  import { BurnNexpCateItem, BurnNexpItem } from '/@/api/burnook/model/nexpModel';
  import { message, Modal } from 'ant-design-vue';

  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction, EditModal },
    setup() {
      const isModalEdit = ref(true);
      const keyword = ref('');

      const [registerTable, { reload }] = useTable({
        title: '所有名词',
        columns: getNexpColumns(),
        api: getNexpList,
        pagination: { pageSize: 20 },
        searchInfo: {
          keyword,
        },
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
      const cateList = ref<BurnNexpCateItem[]>();
      getNexpCateList({ page: 1 }).then((data) => {
        cateList.value = data.items;
      });

      function handleReloadCurrent() {
        reload();
      }

      function handleReload() {
        reload({
          page: 1,
        });
      }
      const editNexp = ref<BurnNexpItem>();
      const handleEdit = (record: UnwrapNestedRefs<BurnNexpItem>) => {
        editNexp.value = record;
        isModalEdit.value = true;
        openEditModal(true);
      };
      const handleAddNexp = () => {
        setModalProps({
          title: '添加名词',
        });
        isModalEdit.value = false;
        openEditModal(true);
      };

      const handleDelete = async (record: BurnNexpItem) => {
        Modal.confirm({
          title: '删除',
          content: `确认删除${record.name}吗？`,
          onOk: async () => {
            await deleteNexp(record.id);
            message.success('操作成功');
            handleReloadCurrent();
          },
        });
      };
      return {
        registerTable,
        handleReloadCurrent,
        handleReload,
        handleEdit,
        registerEditModal,
        openEditModal,
        editNexp: editNexp,
        isModalEdit,
        handleAddNexp: handleAddNexp,
        cateList,
        keyword,
        handleDelete,
      };
    },
  });
</script>
