<template>
  <el-card>
    <template #header>
      <span>基本，当前绑定值：【{{ menu1 }}】</span>
    </template>

    <w-menu v-model="menu1" :options="options" mode="horizontal" />
  </el-card>

  <br />
</template>

<script>
  import { reactive, computed, defineComponent, toRefs } from 'vue'
  import wMenu from '/@/components/UI/Menu/index.vue'

  export default defineComponent({
    name: 'MenuDemo',

    components: { wMenu },

    setup(props, { attrs }) {
      const state = reactive({
        menu1: '',

        options: [
          {
            value: 'en',
            label: 'English',
          },
          {
            value: 'zh_CN',
            label: '简体中文',
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
