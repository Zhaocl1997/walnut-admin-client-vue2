<template>
  <el-form-item>
    <el-space size="mini">
      <el-button v-if="isDevMode && mock" type="text" @click="onMock">
        {{ t('component.form.mock') }}</el-button
      >

      <el-button
        v-if="isDevMode && scopedMock"
        type="text"
        @click="onScopedMock"
      >
        {{ t('component.form.scopedMock') }}</el-button
      >
    </el-space>
  </el-form-item>
</template>

<script>
  import { unref, defineComponent } from 'vue'
  import hooks from '/@/hooks'
  import { isDevMode } from '/@/utils/mode'

  import mockData from '../utils/mock'
  import { useFormContext } from '../hooks/useFormContext'

  export default defineComponent({
    name: 'WFormMock',

    props: {
      schemas: Array,
    },

    emits: ['change'],

    setup(props, { emit }) {
      const { useI18n } = hooks
      const { t } = useI18n()

      const { getContextProps } = useFormContext()
      const { mock, scopedMock, modelValue } = getContextProps()

      const onMock = () => {
        const formData = mockData(unref(props.schemas))
        emit('change', { ...unref(modelValue), ...formData })
      }

      const onScopedMock = () => {
        const formData = mockData(unref(props.schemas).filter((i) => i.mock))
        emit('change', { ...unref(modelValue), ...formData })
      }

      return {
        t,
        mock,
        scopedMock,
        isDevMode,
        onMock,
        onScopedMock,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
