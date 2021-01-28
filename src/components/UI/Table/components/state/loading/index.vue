<template>
  <div v-if="loadingType === 'default'" v-loading="loading">
    <slot></slot>
  </div>

  <div v-if="loadingType === 'skeleton'">
    <el-skeleton :loading="loading" :count="10" animated>
      <template #template>
        <el-skeleton-item style="height: 24px; margin: 10px" />
      </template>

      <template #default>
        <slot></slot>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
  import { defineComponent, inject } from 'vue'
  import { useTableContext } from '/@/components/UI/Table/hooks/useTableContext'

  export default defineComponent({
    name: 'WTableLoading',

    setup() {
      const { getContextProps } = useTableContext()
      const { loading, loadingType } = getContextProps()

      return {
        loading,
        loadingType,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
