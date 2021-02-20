<template>
  <el-divider content-position="left">
    <el-space size="mini">
      <w-title>{{ item.title }}</w-title>
      <w-arrow
        v-if="item.fold === true || item.fold === false"
        :active="item.fold"
        @click="onClickToggle"
      ></w-arrow>
    </el-space>
  </el-divider>
</template>

<script>
  import { defineComponent, onMounted } from 'vue'
  import wTitle from '/@/components/Help/Title/index.vue'
  import wArrow from '/@/components/Help/Arrow/index.vue'

  export default defineComponent({
    name: 'FormDivider',

    components: {
      wTitle,
      wArrow,
    },

    props: {
      item: Object,
    },

    setup(props) {
      const onClickToggle = () => {
        // eslint-disable-next-line
        props.item.fold = !props.item.fold

        if (!props.item.countToFold) {
          // eslint-disable-next-line
          props.item.children.map((child, index) => {
            // eslint-disable-next-line
            props.item.children[index].foldVisible = props.item.fold
          })
        } else {
          const startIndex = props.item.countToFold
          const endIndex = props.item.children.length

          for (let i = startIndex; i < endIndex; i++) {
            // eslint-disable-next-line
            props.item.children.map(() => {
              // eslint-disable-next-line
              props.item.children[i].foldVisible = props.item.fold
            })
          }
        }
      }

      const init = () => {
        if (props.item.defaultFold) {
          onClickToggle()
        }
      }

      onMounted(() => {
        init()
      })

      return {
        onClickToggle,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
