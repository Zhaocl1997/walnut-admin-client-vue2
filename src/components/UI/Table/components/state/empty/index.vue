<template>
  <el-empty
    :description="description"
    :image="image"
    :image-size="imageSize"
  ></el-empty>
</template>

<script>
  import { defineComponent } from 'vue'
  import { useTableContext } from '../../../hooks/useTableContext'

  export default defineComponent({
    name: 'WTableEmpty',

    setup() {
      const { getContextProps } = useTableContext()
      const { description, image, imageSize } = getContextProps()

      return {
        description,
        image,
        imageSize,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
