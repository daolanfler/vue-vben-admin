<template>
  <BasicModal v-bind="$attrs" destroyOnClose @register="register" @ok="handleOk" title="编辑主题">
    <BasicForm @register="registerForm" ref="formElRef" />
  </BasicModal>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, watch } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormActionType, FormSchema, useForm } from '/@/components/Form/index';
  import { message } from 'ant-design-vue';
  import {
    BurnNexpAdd,
    BurnNexpCateItem,
    BurnNexpDetail,
    BurnNexpItem,
  } from '/@/api/burnook/model/nexpModel';
  import { addNexp, getNexpDetail, updateNexp } from '/@/api/burnook/nexp';

  export default defineComponent({
    components: { BasicModal, BasicForm },
    props: {
      cateList: {
        type: Array as PropType<BurnNexpCateItem[]>,
        default: () => [],
      },
      currentNexp: {
        type: Object as PropType<BurnNexpItem>,
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
      const detail = ref<BurnNexpDetail>();

      watch(
        () => props.currentNexp,
        async (val) => {
          if (val.id) {
            detail.value = await getNexpDetail(val.id);
          }
        },
      );
      watch(
        () => detail.value,
        (val) => {
          if (!val) return;
          setFieldsValue({
            cate_id: val.cate_id,
            content: val.content,
            name: val.name,
          });
        },
      );

      const schemas = computed<FormSchema[]>(() => {
        return [
          {
            field: 'name',
            label: '主题名称',
            component: 'Input',
            componentProps: {},
            defaultValue: props.isEdit ? detail.value?.name : '',
            required: true,
          },
          {
            field: 'cate_id',
            label: '类别',
            component: 'Select',
            defaultValue: props.isEdit ? detail.value?.cate_id : undefined,
            componentProps: {
              options: props.cateList.map((item) => ({
                label: item.name,
                value: item.id,
              })),
            },
          },
          {
            field: 'content',
            label: '内容',
            component: 'InputTextArea',
            defaultValue: props.isEdit ? detail.value?.content : '',
            componentProps: {
              rows: 5,
            },
          },
        ];
      });
      const [registerForm, { setFieldsValue, validateFields, getFieldsValue }] = useForm({
        schemas,
        showActionButtonGroup: false,
      });
      async function handleOk() {
        try {
          setModalProps({ confirmLoading: true });
          await validateFields();
          const model = getFieldsValue() as BurnNexpAdd;
          if (props.isEdit) {
            await updateNexp(props.currentNexp.id, {
              name: model.name,
              cate_id: model.cate_id,
              content: model.content,
            });
            message.success('操作成功');
          } else {
            await addNexp({
              name: model.name,
              cate_id: model.cate_id,
              content: model.content,
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
