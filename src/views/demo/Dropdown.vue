<template>
  <el-card>
    <template #header>
      <span>基本，当前绑定值：【{{ dropdown }}】</span>
    </template>

    <w-dropdown v-model="dropdown" :options="options" trigger="click">
      <template #default>
        <w-icon icon="vamo" pointer width="24"></w-icon>
      </template>
    </w-dropdown>
  </el-card>

  <br />
</template>

<script>
  import { reactive, defineComponent, toRefs } from 'vue'
  import wDropdown from '/@/components/UI/Dropdown/index.vue'

  export default defineComponent({
    name: 'DropdownDemo',

    components: { wDropdown },

    setup(props, { attrs }) {
      const state = reactive({
        dropdown: '',

        options: [
          {
            value: '0',
            label: '默认',
          },
          {
            value: '1',
            label: '中等',
          },
          {
            value: '2',
            label: '宽松',
          },
        ],
      })

      return {
        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped></style>
