<template>
  <el-form-item>
    <el-space size="mini">
      <el-button v-if="isDevMode" type="text" @click="onMock">
        {{ t('component.form.mock') }}</el-button
      >

      <el-button v-if="isDevMode" type="text" @click="onScopedMock">
        {{ t('component.form.scopedMock') }}</el-button
      >
    </el-space>
  </el-form-item>
</template>

<script>
  import { unref, defineComponent, toRaw } from 'vue'
  import { useI18n } from '/@/hooks/core/useI18n'
  import { isDevMode } from '/@/utils/mode'

  import mockData from '../../utils/mock'
  import { useFormContext } from '../../hooks/useFormContext'
  import { treeToArr } from 'easy-fns-ts'

  export default defineComponent({
    name: 'FormMock',

    emits: ['change'],

    setup(props, { emit }) {
      const { t } = useI18n()

      const { getContextProps } = useFormContext()
      const { modelValue, schemas } = getContextProps()

      const defaultValue = unref(modelValue)
      const arr = treeToArr(toRaw(unref(schemas)))

      const onMock = () => {
        const formData = mockData(arr)
        console.log(formData)
        emit('change', { ...defaultValue, ...formData })
      }

      const onScopedMock = () => {
        const formData = mockData(arr.filter((i) => i.mock))
        emit('change', { ...defaultValue, ...formData })
      }

      return {
        t,

        isDevMode,
        onMock,
        onScopedMock,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
