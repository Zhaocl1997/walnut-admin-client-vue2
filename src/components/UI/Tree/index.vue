<template>
  <el-tree ref="wTreeRef" v-bind="getBindValue"></el-tree>
</template>

<script>
  import { ref, reactive, computed, defineComponent, nextTick } from 'vue'
  import { wTreeProps } from './props'

  export default defineComponent({
    name: 'WTree',

    inheritAttrs: false,

    props: wTreeProps,

    emits: ['update:modelValue', 'node-click', 'check'],

    setup(props, { attrs, emit }) {
      const wTreeRef = ref(null)

      const defaultProps = {
        id: 'id',
        label: 'label',
        children: 'children',
        disabled: 'disabled',
      }

      const onNodeClick = (data, node, arr) => {
        if (props.multiple) {
          return
        }

        emit('update:modelValue', data[getNodeKey.value])
        emit('node-click', data, node, arr)
      }

      const onCheck = (
        data,
        { checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys }
      ) => {
        if (!props.multiple) {
          return
        }

        nextTick(() => {
          // 1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false
          const res = wTreeRef.value.getCheckedNodes(
            props.leafOnly,
            props.includeHalfChecked
          )

          let ret = []
          res.map((i) => {
            ret.push(i[getNodeKey.value])
          })

          emit('update:modelValue', ret)
          emit('check', data, {
            checkedNodes,
            checkedKeys,
            halfCheckedNodes,
            halfCheckedKeys,
          })
        })
      }

      const getProps = computed(() => {
        return {
          ...defaultProps,
          ...props.props,
        }
      })

      const getNodeKey = computed(() => {
        return getProps.value.id
      })

      const getShowCheckbox = computed(() => {
        return props.multiple
      })

      const getBindValue = computed(() => {
        return {
          ...attrs,
          ...props,
          nodeKey: getNodeKey.value,
          onNodeClick,
          onCheck,
          showCheckbox: getShowCheckbox.value,
        }
      })

      return {
        wTreeRef,
        getBindValue,
        onNodeClick,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
