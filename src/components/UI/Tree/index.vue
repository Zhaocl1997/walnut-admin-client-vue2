<template>
  <el-tree ref="wTreeRef" v-bind="getBindValue"></el-tree>
</template>

<script>
  import {
    ref,
    computed,
    defineComponent,
    nextTick,
    onMounted,
    watch,
  } from 'vue'
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

      // single
      const onNodeClick = (data, node, arr) => {
        if (props.multiple) {
          return
        }

        emit('update:modelValue', data[getNodeKey.value])
        emit('node-click', data, node, arr)
      }

      // multiple
      const onCheck = (
        data,
        { checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys }
      ) => {
        if (!props.multiple) {
          return
        }

        nextTick(() => {
          const ret = onGetCheckedNodes()

          emit('update:modelValue', ret)
          emit('check', data, {
            checkedNodes,
            checkedKeys,
            halfCheckedNodes,
            halfCheckedKeys,
          })
        })
      }

      const arr_diffA = (a, b) => {
        return a.filter((x) => !new Set(b).has(x))
      }

      const feedback = () => {
        if (props.includeHalfChecked) {
          return
        }

        if (!props.modelValue) {
          if (props.multiple) {
            nextTick(() => {
              wTreeRef.value.setCheckedKeys([])
            })
          } else {
            nextTick(() => {
              wTreeRef.value.setCurrentKey(null)
            })
          }

          return
        }

        if (props.multiple) {
          const levelOneNodeIdArr = props.data.map((i) => i[getNodeKey.value])
          const val = arr_diffA(props.modelValue, levelOneNodeIdArr)

          nextTick(() => {
            wTreeRef.value.setCheckedKeys(val)
          })
        } else {
          nextTick(() => {
            wTreeRef.value.setCurrentKey(props.modelValue)
          })
        }
      }

      const expandAll = (val) => {
        let nodes = wTreeRef.value.store.nodesMap
        for (let i in nodes) {
          nodes[i].expanded = val
        }
      }

      const checkAll = (val) => {
        if (!props.multiple) {
          return
        }

        if (val) {
          wTreeRef.value.setCheckedNodes(props.data)

          nextTick(() => {
            const ret = onGetCheckedNodes()

            emit('update:modelValue', ret)
          })
        } else {
          wTreeRef.value.setCheckedKeys([])

          emit('update:modelValue', [])
        }
      }

      const onGetCheckedNodes = () => {
        // 1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false
        const res = wTreeRef.value.getCheckedNodes(
          props.leafOnly,
          props.includeHalfChecked
        )

        let ret = []
        res.map((i) => {
          ret.push(i[getNodeKey.value])
        })
        return ret
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

      onMounted(() => {
        feedback()
      })

      watch(
        () => props.modelValue,
        () => {
          feedback()
        }
      )

      return {
        wTreeRef,
        getBindValue,
        onNodeClick,

        // method
        expandAll,
        checkAll,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
