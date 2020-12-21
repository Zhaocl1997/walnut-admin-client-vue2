<template>
  <el-card>
    <template #header>
      <span>基本，当前绑定值：【{{ dialogVisible1 }}】</span>
    </template>

    <el-button @click="onOpenDialog">打开dialog</el-button>
    <el-button @click="onOpenDialog2">打开全屏dialog</el-button>
  </el-card>

  <br />

  <w-dialog v-model="dialogVisible1" />
  <w-dialog v-model="dialogVisible2" fullscreen />
</template>

<script>
  import wDialog from '/@/components/UI/Dialog/index.vue'
  import { ref, reactive, computed, defineComponent, toRefs } from 'vue'

  export default defineComponent({
    name: 'DialogDemo',

    components: { wDialog },

    setup(props, { attrs }) {
      const state = reactive({
        dialogVisible1: false,
        dialogVisible2: false,
      })

      const onOpenDialog = () => {
        state.dialogVisible1 = true
      }

      const onOpenDialog2 = () => {
        state.dialogVisible2 = true
      }

      return {
        ...toRefs(state),
        onOpenDialog,
        onOpenDialog2,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
