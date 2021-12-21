<template>
  <PageWrapper contentBackground contentClass="flex" dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
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
  import { getNexpCateList, getNexpList } from '/@/api/burnook/nexp';
  import { BurnNexpCateItem, BurnNexpItem } from '/@/api/burnook/model/nexpModel';

  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction, EditModal },
    setup() {
      const isModalEdit = ref(true);
      const [registerTable, { reload }] = useTable({
        title: '古籍主题',
        columns: getNexpColumns(),
        api: getNexpList,
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
      };
    },
  });
</script>
