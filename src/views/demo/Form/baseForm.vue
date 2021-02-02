<template>
  <el-card>
    <template #header>
      <span>集成表单，当前绑定值：</span>

      <w-JSON :value="baseFormData"></w-JSON>

      <w-form
        v-model="baseFormStateData"
        :schema="baseFormStateSchemas"
        label-width="auto"
        compact
        :span="4"
      ></w-form>
    </template>

    <w-form
      v-model="baseFormData"
      v-bind="baseFormStateData"
      :schema="getFormSchema"
      :rules="baseFormRules"
      :count-to-fold="3"
      :label-width="`${baseFormStateData.labelWidth}px`"
      @query="onQuery"
      @reset="onReset"
    >
      <template #formSlot="{ props }">
        <el-input v-model="baseFormData.formSlot"></el-input>
      </template>
    </w-form>
  </el-card>

  <br />
</template>

<script>
  import { reactive, computed, defineComponent, toRefs, toRef } from 'vue'
  import wForm from '/@/components/UI/Form'
  import wJSON from '/@/components/Help/JSON/index.vue'
  import { baseFormStateSchemas } from './schemas'

  export default defineComponent({
    name: 'BaseFormDemo',

    components: { wForm, wJSON },

    setup() {
      const baseFormStateData = reactive({
        itemShow: false,

        compact: false,
        mock: false,
        scopedMock: false,
        query: false,
        print: false,
        disabled: false,
        inline: false,
        labelWidth: 100,
        span: 24,
        gutter: 0,
      })

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

      const onInput = (v) => {
        console.log(v)
      }

      const onQuery = () => {
        console.log('query')
      }

      const onReset = () => {
        console.log('reset')
      }

      const onBlur = () => {
        console.log('blur')
      }

      const getFormSchema = computed(() => {
        return [
          // ==================================
          // ============== Input =============
          // ==================================
          {
            wType: 'Divider',
            title: 'Input',
            fold: true,
            defaultFold: false,
            countToFold: 1,
          },
          {
            wType: 'Input',
            prop: 'formInputBase',
            label: '基本',
            placeholder: '基本',
            clearable: true,
            mock: true,
            show: baseFormStateData.itemShow,
          },
          {
            wType: 'Input',
            prop: 'formSlot',
            label: '自定义插槽',
            placeholder: '自定义插槽',
            slot: true,
          },
          {
            wType: 'Input',
            prop: 'formInputBlackList',
            label: '黑名单',
            placeholder: "禁止输入['<', '>']",
            blackList: ['<', '>'],
            input: onInput,
          },
          {
            wType: 'Input',
            prop: 'formInputPassword',
            label: '密码框',
            placeholder: '密码框',
            showPassword: true,
            clearable: true,
          },
          {
            wType: 'Input',
            prop: 'formInputProp',
            label: '前后置内容',
            placeholder: '前后置内容',
            suffixIcon: 'el-icon-date',
            prefixIcon: 'el-icon-search',
          },
          {
            wType: 'Input',
            prop: 'formInputTextarea',
            label: '文本域',
            placeholder: '文本域',
            type: 'textarea',
            maxlength: 200,
            showWordLimit: true,
            rows: 5,
          },

          // ======================================
          // ============= Input Number ===========
          // ======================================
          {
            wType: 'Divider',
            title: 'InputNumber',
            fold: true,
            defaultFold: true,
          },
          {
            wType: 'InputNumber',
            prop: 'formInputNumber',
            label: '数字框',
            placeholder: '数字框',
            step: 5,
            max: 30,
            min: 5,
            precision: 4,
          },

          // ==================================
          // ============== Select ============
          // ==================================
          {
            wType: 'Divider',
            title: 'Select',
            fold: true,
            defaultFold: false,
          },
          {
            wType: 'Select',
            prop: 'formSelectBase',
            label: '基本',
            placeholder: '基本',
            options,
            clearable: true,
            formatter: (val) => options.find((i) => i.value === val).label,
            blur: onBlur,
          },
          {
            wType: 'Select',
            prop: 'formSelectMultipleArray',
            label: '多选-数组',
            placeholder: '多选-数组',
            options,
            clearable: true,
            multiple: true,
            formatter: (val) => {
              let ret = []
              val.map((v) => {
                const l = options.find((i) => i.value === v).label
                ret.push(l)
              })
              return ret
            },
          },
          {
            wType: 'Select',
            prop: 'formSelectMultipleCollapse',
            label: '多选-坍塌',
            placeholder: '多选-坍塌',
            options,
            clearable: true,
            multiple: true,
            collapseTags: true,
          },
          {
            wType: 'Select',
            prop: 'formSelectMultipleObject',
            label: '多选-对象',
            placeholder: '多选-对象',
            options,
            clearable: true,
            multiple: true,
            valueKey: 'value',
          },
        ]
      })

      const baseForm = reactive({
        baseFormData: {
          pageNum: 1,
          pageSize: 10,
        },
      })

      return {
        baseFormStateData,
        baseFormStateSchemas,

        ...toRefs(baseForm),
        getFormSchema,

        baseFormRules: {
          formInputBase: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          formSelectBase: [
            { required: true, message: '请选择', trigger: 'change' },
          ],
        },

        onQuery,
        onReset,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
