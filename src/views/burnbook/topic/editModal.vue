<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="register"
    title="编辑主题"
    :helpMessage="['提示1', '提示2']"
  >
    <!-- <template #insertFooter>
      <a-button type="primary" danger @click="setLines">点我更新内容</a-button>
    </template> -->
    <!-- <template v-if="loading">
      <div class="empty-tips">加载中，稍等3秒……</div>
    </template> -->
    <!-- <template v-if="!loading">
      <ul>
        <li v-for="index in lines" :key="index">加载完成{{ index }}！</li>
      </ul>
    </template> -->

    <BasicForm :schemas="schemas" :show-action-button-group="false" />
  </BasicModal>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, watch } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema } from '/@/components/Form/index';
  import { BurnBookItem } from '/@/api/burnook/model/bookModel';
  import { SelectProps } from 'ant-design-vue';

  export enum BookTopicCateIdEnum {
    UNSELECTED,
    BY_DYNASTY,
    BY_THOUGHT_CLASS,
  }

  export default defineComponent({
    components: { BasicModal, BasicForm },
    props: {
      bookList: {
        type: Array as PropType<BurnBookItem[]>,
        default: () => [],
      },
    },
    setup(props) {
      const loading = ref(true);
      const lines = ref(10);
      const [register, { setModalProps, redoModalHeight }] = useModalInner();

      watch(
        () => lines.value,
        () => {
          redoModalHeight();
        },
      );

      // function handleShow(visible: boolean) {
      //   if (visible) {
      //     loading.value = true;
      //     setModalProps({ loading: true, confirmLoading: true });
      //     setTimeout(() => {
      //       lines.value = Math.round(Math.random() * 30 + 5);
      //       loading.value = false;
      //       setModalProps({ loading: false, confirmLoading: false });
      //     }, 3000);
      //   }
      // }

      function setLines() {
        lines.value = Math.round(Math.random() * 20 + 10);
      }

      const schemas = computed<FormSchema[]>(() => {
        return [
          {
            field: 'name',
            label: '主题名称',
            component: 'Input',
            componentProps: {},
          },
          {
            field: 'cate_id',
            label: '类别',
            component: 'Select',
            componentProps: {
              options: [
                { value: BookTopicCateIdEnum.UNSELECTED, label: '未选择' },
                { value: BookTopicCateIdEnum.BY_DYNASTY, label: '按朝代' },
                { value: BookTopicCateIdEnum.BY_THOUGHT_CLASS, label: '按思想流派' },
              ],
            },
          },
          {
            field: 'book_ids',
            label: '书籍',
            component: 'Select',
            componentProps: {
              options: props.bookList.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              }),
              mode: 'multiple',
              filterOption: (input: string, option: any) => {
                return option.label.indexOf(input) >= 0;
              },
              showSearch: true,
              dropdownStyle: {
                height: '200px',
              },
            } as SelectProps,
          },
        ];
      });

      return { register, setLines, schemas };
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
