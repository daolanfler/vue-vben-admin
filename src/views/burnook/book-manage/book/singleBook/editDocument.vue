<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    @ok="handleOk"
    title="编辑文档内容"
    width="700px"
  >
    <!-- <p class="h-20" v-for="index in 20" :key="index">根据屏幕高度自适应</p> -->
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { reactive, h, computed, ref, watch } from 'vue';
  import { BurnBookItem, BurnDocument } from '/@/api/burnook/model/bookModel';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Tinymce } from '/@/components/Tinymce/index';
  import { BurnDocDetail } from '/@/api/burnook/model/docModel';
  import { getDocDetail, updateDocDetail } from '/@/api/burnook/doc';
  import { message } from 'ant-design-vue';

  defineEmits(['register']);
  let doc = ref<Nullable<BurnDocument>>(null);
  const model = ref({
    title: '',
    content: '',
  });
  const [register, { closeModal, setModalProps }] = useModalInner((data: BurnDocument) => {
    doc.value = data;
  });

  watch(
    () => doc.value?.id,
    async (val?: number) => {
      if (val) {
        try {
          const data = await getDocDetail(val);
          model.value = {
            content: data.content,
            title: data.title,
          };
        } catch (e) {
          message.error((e as Error).message);
        }
      }
    },
  );
  const schemas = computed<FormSchema[]>(() => {
    return [
      {
        field: 'title',
        component: 'Input',
        label: '名称',
        defaultValue: model.value.title,
        rules: [{ required: true }],
      },
      {
        field: 'content',
        component: 'Input',
        label: '内容',
        defaultValue: model.value.content,
        rules: [{ required: true }],
        render: ({ model, field }) => {
          return h(Tinymce, {
            value: model[field],
            showImageUpload: false,

            onChange: (value: string) => {
              model[field] = value;
            },
          });
        },
      },
    ];
  });
  // watch(
  //   () => schemas,
  //   () => {
  //     console.log('watch schemas changed');
  //   },
  //   {
  //     deep: true,
  //     immediate: true,
  //   },
  // );
  const [registerForm, { getFieldsValue, validateFields, setFieldsValue }] = useForm({
    schemas,
    showActionButtonGroup: false,
    labelWidth: 100,
  });

  watch(
    () => model.value,
    () => {
      setFieldsValue({
        title: model.value.title,
        content: model.value.content,
      });
    },
  );

  async function handleOk() {
    try {
      setModalProps({ confirmLoading: true });
      await validateFields();
      const formModel = getFieldsValue();
      await updateDocDetail(doc.value?.id as number, {
        content: formModel.content,
        title: formModel.title,
      });
    } catch (e) {
      e.message && message.error((e as Error).message);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
