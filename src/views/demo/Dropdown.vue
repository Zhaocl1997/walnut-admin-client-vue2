<template>
  <el-card>
    <template #header>
      <span>基本，当前绑定值：【{{ dropdown }}】</span>
    </template>

    <w-dropdown v-model="dropdown" :options="options">
      <template #default>
        <w-icon icon="language" pointer width="24"></w-icon>
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
            label: '紧凑',
          },
          {
            value: '1',
            label: '默认',
          },
          {
            value: '2',
            label: '紧凑',
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
