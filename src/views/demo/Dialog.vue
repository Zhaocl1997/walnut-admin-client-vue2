<template>
  <el-card>
    <template #header>
      <span>基本，当前绑定值：【{{ dialogVisible }}】</span>

      <el-form inline>
        <el-space>
          <el-form-item label="头部">
            <el-switch v-model="header" />
          </el-form-item>

          <el-form-item label="脚部">
            <el-switch v-model="footer" />
          </el-form-item>

          <el-form-item label="横线">
            <el-switch v-model="line" />
          </el-form-item>

          <el-form-item label="全屏">
            <el-switch v-model="fullscreen" />
          </el-form-item>
        </el-space>
      </el-form>
    </template>

    <el-button @click="onOpenDialog">打开dialog</el-button>
  </el-card>

  <br />

  <w-dialog
    v-model="dialogVisible"
    title="弹窗扩展"
    :header="header"
    :footer="footer"
    :line="line"
    :fullscreen="fullscreen"
  >
    <h1 v-for="i in 20" :key="i">标题 {{ i }}</h1>
  </w-dialog>
</template>

<script>
  import wDialog from '/@/components/UI/Dialog/index.vue'
  import { ref, reactive, computed, defineComponent, toRefs } from 'vue'

  export default defineComponent({
    name: 'DialogDemo',

    components: { wDialog },

    setup(props, { attrs }) {
      const state = reactive({
        dialogVisible: false,

        header: false,
        footer: false,
        line: false,
        fullscreen: false,
      })

      const onOpenDialog = () => {
        state.dialogVisible = true
      }

      return {
        ...toRefs(state),
        onOpenDialog,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
