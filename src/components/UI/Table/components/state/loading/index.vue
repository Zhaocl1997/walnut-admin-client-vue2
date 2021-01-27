<template>
  <el-skeleton :loading="loading" :count="10" animated>
    <template #template>
      <el-skeleton-item style="height: 24px; margin: 10px" />
    </template>

    <template #default>
      <slot></slot>
    </template>
  </el-skeleton>
</template>

<script>
  import { defineComponent } from 'vue'
  import { useTableContext } from '/@/components/UI/Table/hooks/useTableContext'

  export default defineComponent({
    name: 'WTableLoading',

    setup() {
      const { getContextProps } = useTableContext()
      const { loading } = getContextProps()

      return {
        loading,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
