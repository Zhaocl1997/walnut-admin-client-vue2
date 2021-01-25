<template>
  <el-select
    ref="selectTreeRef"
    v-model="selectValue"
    :size="size"
    :multiple="multiple"
    :disabled="disabled"
    :clearable="clearable"
    :placeholder="placeholder"
    :collapse-tags="collapse"
    @change="onSelectChange"
  >
    <el-option :value="optionValue" style="max-height: 200px; overflow-y: auto">
      <w-tree
        ref="treeRef"
        v-model="treeValue"
        leaf-only
        :data="data"
        :props="treeProps"
        :multiple="multiple"
        :accordion="accordion"
        @node-click="onNodeClick"
        @check="onCheckChange"
      ></w-tree>
    </el-option>
  </el-select>
</template>

<script>
  import {
    ref,
    reactive,
    defineComponent,
    computed,
    nextTick,
    unref,
    onMounted,
  } from 'vue'
  import wTree from '../Tree/index.vue'
  import { wSelectTreeProps } from './props'

  const findNodeById = (
    id,
    data,
    nodeKey = 'id',
    prop = {
      children: 'children',
      label: 'label',
    },
    onlyTarget = false
  ) => {
    let hasFound = false
    let ret = {}

    const findNode = (data) => {
      if (Array.isArray(data) && !hasFound) {
        data.forEach((item) => {
          if (item[nodeKey] === id) {
            ret = item
            hasFound = true
          } else if (item[prop.children]) {
            findNode(item[prop.children])
          }
        })
      }
    }

    findNode(data)

    return onlyTarget ? ret : hasFound
  }

  export default defineComponent({
    name: 'WSelectTree',

    components: { wTree },

    inheritAttrs: false,

    props: wSelectTreeProps,

    emits: ['update:modelValue'],

    setup(props, { attrs, emit }) {
      const defaultProps = {
        id: 'id',
        label: 'label',
        children: 'children',
        disabled: 'disabled',
      }

      const selectValue = ref('')
      const optionValue = ref('')
      const treeValue = ref('')
      const treeRef = ref('')
      const selectTreeRef = ref('')

      const treeProps = computed(() => {
        return {
          ...defaultProps,
          ...props.props,
        }
      })

      const feedback = () => {
        if (props.data.length == 0) {
          return
        }

        if (!props.modelValue) {
          selectValue.value = ''
          optionValue.value = []
          return
        }

        if (props.multiple) {
          const tagArray = []
          const nodeArray = []

          props.modelValue.map((i) => {
            const node = findNodeById(
              i,
              props.data,
              treeProps.value.id,
              treeProps.value,
              true
            )

            nodeArray.push(node)
            tagArray.push(node[treeProps.value.label])
          })

          selectValue.value = tagArray
          optionValue.value = nodeArray
          treeValue.value = props.modelValue
        } else {
          const node = findNodeById(
            props.modelValue,
            props.data,
            treeProps.value.id,
            treeProps.value,
            true
          )

          selectValue.value = node[treeProps.value.label]
          optionValue.value = [node]
          treeValue.value = props.modelValue
        }
      }

      // select change
      const onSelectChange = (labels) => {
        let arr = []

        for (let i = 0; i < optionValue.value.length; i++) {
          for (let j = 0; j < labels.length; j++) {
            if (labels[j] === optionValue.value[i][treeProps.value.label]) {
              arr.push(optionValue.value[i])
            }
          }
        }

        let newV = []
        arr.map((i) => newV.push(i[treeProps.value.id]))

        treeValue.value = newV
        emit('update:modelValue', newV)
      }

      // multiple
      const onCheckChange = () => {
        if (!props.multiple) {
          return
        }

        let res = treeRef.value.$refs.wTreeRef.getCheckedNodes(true, false)

        let tagArray = []
        res.forEach((item) => {
          tagArray.push(item[treeProps.value.label])
        })

        selectValue.value = tagArray
        emit('update:modelValue', unref(treeValue.value))
      }

      // single
      const onNodeClick = (data, node, arr) => {
        if (props.multiple) {
          return
        }

        selectValue.value = data[treeProps.value.label]

        emit('update:modelValue', treeValue.value)

        nextTick(() => {
          selectTreeRef.value.blur()
        })
      }

      onMounted(() => {
        feedback()
      })

      return {
        selectValue,
        optionValue,
        treeValue,
        treeProps,

        treeRef,
        selectTreeRef,

        onSelectChange,
        onCheckChange,
        onNodeClick,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: #fff;
  }
  .el-select-dropdown__item::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .el-select-dropdown__item::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background: #535353;
  }

  .el-select-dropdown__item::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 10px;
    background: #ededed;
  }
</style>
