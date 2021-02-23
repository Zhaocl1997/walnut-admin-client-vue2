<template>
  <el-divider content-position="left">
    <el-space size="mini">
      <w-title>{{ item.title }}</w-title>
      <w-arrow
        v-if="item.fold === true || item.fold === false"
        :active="item.fold"
        @click="onToggle"
      ></w-arrow>
    </el-space>
  </el-divider>
</template>

<script>
  import { defineComponent, onMounted, unref } from 'vue'
  import wTitle from '/@/components/Help/Title/index.vue'
  import wArrow from '/@/components/Help/Arrow/index.vue'
  import { useFormContext } from '../../hooks/useFormContext'

  export default defineComponent({
    name: 'FormDivider',

    components: {
      wTitle,
      wArrow,
    },

    props: {
      // TODO
      // use index for temp
      index: Number,
    },

    setup(props) {
      const { getContextProps } = useFormContext()
      const { schemas } = getContextProps()

      const item = unref(schemas)[props.index]

      const onToggle = () => {
        item.fold = !item.fold

        if (!item.countToFold) {
          item.children.map((child, index) => {
            item.children[index].foldVisible = item.fold
          })
        } else {
          const startIndex = item.countToFold
          const endIndex = item.children && item.children.length

          for (let i = startIndex; i < endIndex; i++) {
            item.children.map(() => {
              item.children[i].foldVisible = item.fold
            })
          }
        }
      }

      const init = () => {
        if (item.defaultFold) {
          onToggle()
        }
      }

      onMounted(() => {
        init()
      })

      return {
        item,
        onToggle,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
