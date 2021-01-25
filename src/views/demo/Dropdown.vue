<template>
  <el-card>
    <template #header>
      <span>综合，当前绑定值：【{{ dropdown1 }}】</span>

      <el-form inline>
        <el-space>
          <el-form-item label="有禁用项目">
            <el-switch v-model="disabled" />
          </el-form-item>

          <el-form-item label="有分割线">
            <el-switch v-model="divided" />
          </el-form-item>

          <el-form-item label="有icon">
            <el-switch v-model="icon" />
          </el-form-item>
        </el-space>
      </el-form>
    </template>

    <w-dropdown v-model="dropdown1" :options="options" trigger="click">
      <template #default>
        <w-icon icon="home" pointer width="24"></w-icon>
      </template>
    </w-dropdown>
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>显示值与真实值相同 ，当前绑定值：【{{ dropdown2 }}】</span>
    </template>

    <w-dropdown
      v-model="dropdown2"
      :options="options"
      trigger="click"
      value-key="label"
    >
      <template #default>
        <w-icon icon="home" pointer width="24"></w-icon>
      </template>
    </w-dropdown>
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>插槽 ，当前绑定值：【{{ dropdown3 }}】</span>
    </template>

    <w-dropdown v-model="dropdown3" :options="options" trigger="click">
      <template #default>
        <w-icon icon="home" pointer width="24"></w-icon>
      </template>

      <template #f="{ prop }">
        <span>{{ prop }} + 煎饼果子</span>
      </template>
    </w-dropdown>
  </el-card>

  <br />
</template>

<script>
  import { reactive, defineComponent, toRefs, computed } from 'vue'
  import wDropdown from '/@/components/UI/Dropdown/index.vue'

  export default defineComponent({
    name: 'DropdownDemo',

    components: { wDropdown },

    setup(props, { attrs }) {
      const state = reactive({
        dropdown1: 'e',
        dropdown2: '蚵仔煎',
        dropdown3: 'f',
        dropdown4: '',

        disabled: false,
        divided: false,
        icon: false,
      })

      const options = computed(() => {
        return [
          {
            value: 'a',
            label: '黄金糕',
            disabled: state.disabled,
          },
          {
            value: 'b',
            label: '狮子头',
            divided: state.divided,
          },
          {
            value: 'c',
            label: '螺蛳粉',
            icon: state.icon ? 'el-icon-check' : '',
          },
          {
            value: 'd',
            label: '双皮奶',
          },
          {
            value: 'e',
            label: '蚵仔煎',
          },
          {
            value: 'f',
            label: '烤冷面',
            slot: true,
          },
        ]
      })

      return {
        options,
        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped>
  .el-form-item {
    margin-bottom: 0;
  }
</style>
