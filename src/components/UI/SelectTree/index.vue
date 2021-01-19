<template>
  <el-select
    ref="selectTree"
    v-model="selectValue"
    :size="size"
    :style="style"
    :multiple="multiple"
    :disabled="disabled"
    :clearable="clearable"
    :placeholder="placeholder"
    :collapse-tags="collapse"
    @change="onSelectChange"
    @clear="onClear"
  >
    <el-option :value="optionValue" style="height: 200px; overflow-y: auto">
      <w-tree
        ref="wTree"
        leaf-only
        v-model="treeValue"
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
  import { ref, reactive, defineComponent, computed } from 'vue'
  import wTree from '../Tree'
  import { wSelectTreeProps } from './props'
  import { findNodeById } from 'easy-fns-ts'

  export default defineComponent({
    name: 'WSelectTree',

    inheritAttrs: false,

    components: { wTree },

    props: wSelectTreeProps,

    emits: ['update:modelValue'],

    setup(props, { attrs, emit }) {
      const defaultProps = {
        id: 'id',
        label: 'label',
        children: 'children',
        disabled: 'disabled',
      }

      const selectValue = ref(null)
      const optionValue = ref(null)
      const treeValue = ref(null)

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

        if (multiple) {
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
      const onSelectChange = (v) => {
        let arr = []

        for (let i = 0; i < optionValue.value.length; i++) {
          for (let j = 0; j < v.length; j++) {
            if (v[j] === optionValue.value[i][treeProps.value.label]) {
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
      const onCheckChange = () => {}
    },
  })
</script>

<style lang="scss" scoped></style>
