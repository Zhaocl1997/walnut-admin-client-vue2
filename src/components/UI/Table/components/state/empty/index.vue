<template>
  <template v-if="getHasSlotEmpty">
    <slot></slot>
  </template>

  <template v-else>
    <el-empty
      :description="description"
      :image="image"
      :image-size="imageSize"
    ></el-empty>
  </template>
</template>

<script>
  import { defineComponent, computed } from 'vue'
  import { useTableContext } from '/@/components/UI/Table/hooks/useTableContext'

  export default defineComponent({
    name: 'WTableEmpty',

    setup(_, { slots }) {
      const { getContextProps } = useTableContext()
      const { description, image, imageSize } = getContextProps()

      const getHasSlotEmpty = computed(() => {
        return (
          slots.default()[0].children &&
          slots.default()[0].children.length === 1
        )
      })

      return {
        description,
        image,
        imageSize,

        getHasSlotEmpty,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
