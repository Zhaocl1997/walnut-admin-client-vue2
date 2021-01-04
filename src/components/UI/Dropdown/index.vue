<template>
  <el-dropdown v-bind="getBindValue" @command="onCommand">
    <slot></slot>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in options"
          :key="item.value"
          :command="item.value"
          :class="calcClass(item.value)"
          >{{ item.label }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
  import { ElDropdown } from 'element-plus'
  import { ref, reactive, computed, defineComponent } from 'vue'
  import { omit } from 'easy-fns-ts/dist/esm'
  import { wDropdownProps } from './props'

  export default defineComponent({
    name: 'wDropdown',

    inheritAttrs: false,

    props: wDropdownProps,

    emits: ['update:modelValue', 'command'],

    setup(props, { attrs, emit }) {
      const calcClass = (val) => {
        return [
          {
            'w-highlight': props.modelValue === val,
          },
        ]
      }

      const onCommand = (val) => {
        emit('update:modelValue', val)
        emit('command', val)
      }

      const getBindValue = computed(() => {
        return omit(
          {
            ...attrs,
            ...props,
          },
          ['options', 'modelValue']
        )
      })

      return {
        getBindValue,
        calcClass,
        onCommand,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
