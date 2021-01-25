<template>
  <el-card>
    <template #header>
      <span>集成表单，当前绑定值：【{{ formData }}】</span>

      <el-form inline>
        <el-space>
          <el-form-item label="控制显隐">
            <el-switch v-model="inputBaseShow" />
          </el-form-item>

          <el-form-item label="模拟">
            <el-switch v-model="mockButton" />
          </el-form-item>

          <el-form-item label="局部模拟">
            <el-switch v-model="scopedMockButton" />
          </el-form-item>

          <el-form-item label="查询">
            <el-switch v-model="queryButton" />
          </el-form-item>

          <el-form-item label="重置">
            <el-switch v-model="resetButton" />
          </el-form-item>

          <el-form-item label="展开/收起">
            <el-switch v-model="foldButton" />
          </el-form-item>

          <el-form-item label="打印">
            <el-switch v-model="printButton" />
          </el-form-item>

          <el-form-item label="禁用">
            <el-switch v-model="formDisabled" />
          </el-form-item>

          <el-form-item label="prettier">
            <el-switch v-model="formPrettier" />
          </el-form-item>
        </el-space>
      </el-form>
    </template>

    <w-form
      v-model="formData"
      :schema="getFormSchema"
      :rules="formRules"
      label-width="100px"
      :mock="mockButton"
      :scoped-mock="scopedMockButton"
      :query="queryButton"
      :reset="resetButton"
      :fold="foldButton"
      :count-to-fold="3"
      :disabled="formDisabled"
      :prettier="formPrettier"
      @query="onQuery"
      @reset="onReset"
    >
      <template #formSlot="{ props }">
        <el-input v-model="formData.formSlot"></el-input>
      </template>
    </w-form>
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
      const formState = reactive({
        mockButton: false,
        scopedMockButton: false,
        queryButton: false,
        resetButton: false,
        foldButton: false,
        printButton: false,
        formDisabled: false,
        formPrettier: false,

        inputBaseShow: false,
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
            show: formState.inputBaseShow,
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

      const state = reactive({
        formData: {
          pageNum: 1,
          pageSize: 10,
        },
      })

      return {
        ...toRefs(state),
        ...toRefs(formState),
        getFormSchema,
        formRules: {
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
