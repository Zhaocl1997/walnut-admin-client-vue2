<template>
  <div>
    <el-card>
      <template #header>
        <span>hook表单，当前绑定值：</span>

        <w-JSON :value="formValue"></w-JSON>

        <el-button @click="onValidate">验证</el-button>
        <el-button @click="onClearValidate">清空验证</el-button>
        <el-button @click="onResetFields">重置</el-button>
      </template>

      <w-form v-model="formValue" @hook="register"></w-form>
    </el-card>
  </div>
</template>

<script>
  import { ref, reactive, defineComponent } from 'vue'
  import wForm, { useForm } from '/@/components/UI/Form'
  import wJSON from '/@/components/Help/JSON/index.vue'
  import { ElMessage, ElMessageBox } from 'element-plus'

  export default defineComponent({
    name: 'UseForm',

    components: { wForm, wJSON },

    setup() {
      const formValue = ref({})

      const formConfig = reactive({
        labelWidth: 'auto',

        disabled: false,

        schemas: [
          {
            wType: 'Input',
            prop: 'Input',
            label: 'Input',
            placeholder: 'Input',
          },
          {
            wType: 'InputNumber',
            prop: 'InputNumber',
            label: 'InputNumber',
            placeholder: 'InputNumber',
            step: 5,
            max: 30,
            min: 5,
            precision: 4,
          },
          {
            wType: 'Select',
            prop: 'Select',
            label: 'Select',
            placeholder: 'Select',
            options: [
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
            ],
            clearable: true,
          },
        ],

        rules: {
          Input: [{ required: true, message: '请输入', trigger: 'blur' }],
          InputNumber: [{ required: true, message: '请输入', trigger: 'blur' }],
          Select: [{ required: true, message: '请选择', trigger: 'change' }],
        },
      })

      const [register, { validate, clearValidate, resetFields }] = useForm(
        formConfig
      )

      const onValidate = async () => {
        const valid = await validate()

        if (valid) {
          ElMessage.success('通过校验')
        }
      }

      const onClearValidate = async () => {
        await clearValidate()
      }

      const onResetFields = async () => {
        await resetFields()
      }

      return {
        formValue,
        register,

        onValidate,
        onClearValidate,
        onResetFields,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
