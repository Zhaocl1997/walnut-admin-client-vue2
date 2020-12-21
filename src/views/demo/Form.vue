<template>
  <el-card>
    <template #header>
      <span>集成表单，当前绑定值：【{{ formData }}】</span>
    </template>

    <w-form v-model="formData" :model="formModel"></w-form>
  </el-card>

  <br />
</template>

<script>
  import { ref, reactive, computed, defineComponent, toRefs } from 'vue'
  import wForm from '/@/components/UI/Form/index.vue'

  export default defineComponent({
    name: 'FormDemo',

    components: { wForm },

    setup(props, { attrs }) {
      const options = [
        {
          value: '1',
          label: '北京',
        },
        {
          value: '2',
          label: '上海',
        },
        {
          value: '3',
          label: '广州',
        },
        {
          value: '4',
          label: '深圳',
        },
      ]

      const state = reactive({
        formModel: [
          {
            wType: 'Input',
            prop: 'formInput',
            label: '输入框',
            placeholder: '表单输入框',
            clearable: true,
          },
          {
            wType: 'InputNumber',
            prop: 'formInputNumber',
            label: '数字框',
            placeholder: '表单数字框',
            controlsPosition: 'right',
          },
          {
            wType: 'Radio',
            prop: 'formRadio',
            label: '单选框',
            options,
          },
          {
            wType: 'Checkbox',
            prop: 'formCheckbox',
            label: '多选框',
            options,
          },
        ],

        formData: {
          formCheckbox: [],
        },
      })

      return {
        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped></style>
