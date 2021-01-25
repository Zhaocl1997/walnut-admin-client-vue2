<template>
  <el-dropdown v-bind="getBindValue" @command="onCommand">
    <slot></slot>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in options"
          :key="item[optionValue]"
          :command="valueKey ? item[valueKey] : item[optionValue]"
          :disabled="item.disabled"
          :divided="item.divided"
          :icon="item.icon"
          :class="calcClass(item[optionValue])"
        >
          <span v-if="!item.slot"> {{ item[optionLabel] }}</span>
          <template v-else>
            <slot :name="item[optionValue]" :prop="item[optionLabel]"></slot>
          </template>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
  import { ref, reactive, computed, defineComponent } from 'vue'
  import { omit } from 'lodash-es'
  import { wDropdownProps } from './props'

  export default defineComponent({
    name: 'WDropdown',

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
          ['options', 'optionValue', 'optionLabel', 'modelValue', 'valueKey']
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
