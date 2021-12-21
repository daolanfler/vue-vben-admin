<template>
  <PageWrapper contentBackground contentClass="flex" dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleAddCate">添加分类</a-button>
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
      :currentCate="editCate"
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
  import { getCateColumns } from './tableData';
  import EditModal from './editModal.vue';
  import { getNexpCateList } from '/@/api/burnook/nexp';
  import { BurnNexpCateItem } from '/@/api/burnook/model/nexpModel';

  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction, EditModal },
    setup() {
      const isModalEdit = ref(true);
      const [registerTable, { reload }] = useTable({
        title: '名词分类',
        columns: getCateColumns(),
        api: getNexpCateList,
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

      function handleReloadCurrent() {
        reload();
      }

      function handleReload() {
        reload({
          page: 1,
        });
      }
      const editCate = ref<BurnNexpCateItem>();
      const handleEdit = (record: UnwrapNestedRefs<BurnNexpCateItem>) => {
        editCate.value = record;
        isModalEdit.value = true;
        openEditModal(true);
      };
      const handleAddCate = () => {
        setModalProps({
          title: '添加分类',
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
        editCate,
        isModalEdit,
        handleAddCate,
      };
    },
  });
</script>
