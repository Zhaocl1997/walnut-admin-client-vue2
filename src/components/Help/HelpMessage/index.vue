<template>
  <el-tooltip v-bind="getTooltipProps">
    <template v-if="$slots.content" #content>
      <slot name="content"></slot>
    </template>

    <i :class="icon"></i>
  </el-tooltip>
</template>

<script>
  import { ref, reactive, defineComponent, computed, unref } from 'vue'
  import { ElTooltip } from 'element-plus'
  import { omit } from 'easy-fns-ts'

  export default defineComponent({
    name: 'WHelpMessage',

    props: {
      ...ElTooltip.props,

      icon: {
        type: String,
        default: 'el-icon-question',
      },
    },

    setup(props) {
      const getTooltipProps = computed(() => {
        return omit(unref(props), 'icon')
      })

      return {
        getTooltipProps,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
