<template>
  <div>
    <el-card>
      <template #header>
        <span>hook表单，当前绑定值：</span>

        <w-JSON :value="modelValue"></w-JSON>

        <el-button>验证</el-button>
        <el-button>清空验证</el-button>
        <el-button>重置</el-button>
      </template>

      <w-form @hook="register"></w-form>
    </el-card>
  </div>
</template>

<script>
  import { ref, reactive, defineComponent, toRefs } from 'vue'
  import wForm, { useForm } from '/@/components/UI/Form'
  import wJSON from '/@/components/Help/JSON/index.vue'

  export default defineComponent({
    name: 'UseForm',

    components: { wForm, wJSON },

    setup() {
      const formConfig = reactive({
        modelValue: {},

        labelWidth: '60px',

        schemas: [
          {
            wType: 'Input',
            prop: 'test1',
            label: 'test1',
            placeholder: 'test1',
          },
        ],
      })

      const [register] = useForm(formConfig)

      return {
        register,
        ...toRefs(formConfig),
      }
    },
  })
</script>

<style lang="scss" scoped></style>
