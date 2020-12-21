<template>
  <el-form v-bind="getBindValue">
    <!-- form layout -->
    <el-row :gutter="gutter">
      <el-col
        v-for="item in model"
        :key="item.prop"
        :span="item.span ? item.span : span"
      >
        <div v-if="calcShow(item)">
          <el-form-item v-bind="item">
            <!-- Input -->
            <w-input
              v-if="showItem(item, FORM_TYPES.INPUT)"
              v-model="modelValue[item.prop]"
              v-bind="item"
            ></w-input>

            <!-- InputNumber -->
            <w-input-number
              v-if="showItem(item, FORM_TYPES.INPUT_NUMBER)"
              v-model="modelValue[item.prop]"
              v-bind="item"
            ></w-input-number>

            <!-- Radio -->
            <w-radio
              v-if="showItem(item, FORM_TYPES.RADIO)"
              v-model="modelValue[item.prop]"
              v-bind="item"
            ></w-radio>

            <!-- Checkbox -->
            <w-checkbox
              v-if="showItem(item, FORM_TYPES.CHECKBOX)"
              v-model="modelValue[item.prop]"
              v-bind="item"
            ></w-checkbox>
          </el-form-item>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  import { ElForm } from 'element-plus'
  import { ref, reactive, computed, defineComponent } from 'vue'

  import { wFormProps } from './props'
  import { wFormComponents } from './components'
  import { FORM_TYPES } from './types'

  export default defineComponent({
    name: 'WForm',

    components: wFormComponents,

    inheritAttrs: false,

    props: wFormProps,

    setup(props, { attrs }) {
      const getBindValue = computed(() => {
        return { ...attrs, ...props }
      })

      const showItem = (item, TYPE) => {
        return item.wType === TYPE && !item.slot
      }

      const calcShow = (item) => {
        const isShow = item.show === undefined ? true : item.show
        return !item.foldShow && isShow
      }

      return {
        FORM_TYPES,
        getBindValue,

        showItem,
        calcShow,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
