<template>
  <BasicModal v-bind="$attrs" destroyOnClose @register="register" @ok="handleOk" title="编辑">
    <BasicForm @register="registerForm" ref="formElRef" />
  </BasicModal>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormActionType, FormSchema, useForm } from '/@/components/Form/index';
  import { message } from 'ant-design-vue';
  import { addNexpCate, updateNexpCate } from '/@/api/burnook/nexp';
  import { BurnNexpCateItem } from '/@/api/burnook/model/nexpModel';

  export default defineComponent({
    components: { BasicModal, BasicForm },
    props: {
      currentCate: {
        type: Object as PropType<BurnNexpCateItem>,
        default: () => ({}),
      },
      isEdit: {
        type: Boolean,
        default: true,
      },
    },
    emits: ['confirmed', 'register'],
    setup(props, { emit }) {
      const [register, { setModalProps, closeModal }] = useModalInner();
      const formElRef = ref<Nullable<FormActionType>>(null);

      const schemas = computed<FormSchema[]>(() => {
        return [
          {
            field: 'name',
            label: '分类名称',
            component: 'Input',
            componentProps: {},
            defaultValue: props.isEdit ? props.currentCate.name : '',
            required: true,
          },
        ];
      });
      const [registerForm, { validateFields, getFieldsValue }] = useForm({
        schemas,
        showActionButtonGroup: false,
      });
      async function handleOk() {
        try {
          setModalProps({ confirmLoading: true });
          await validateFields();
          const model = getFieldsValue() as { name: string };
          if (props.isEdit) {
            await updateNexpCate(props.currentCate.id, {
              name: model.name,
            });
            message.success('操作成功');
          } else {
            await addNexpCate({
              name: model.name,
            });
            message.success('添加成功');
          }
          emit('confirmed');
          closeModal();
        } catch (e) {
          console.log(e);
          message.error((e as unknown as Error).message);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { register, handleOk, formElRef, registerForm };
    },
  });
</script>

<style scoped>
  .empty-tips {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>
