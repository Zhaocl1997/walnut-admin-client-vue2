<template>
  <el-card>
    <template #header>
      <span>基本，当前绑定值：【{{ dialogVisible1 }}】</span>
    </template>

    <el-button @click="onOpenDialog"> 打开dialog </el-button>
  </el-card>

  <br />

  <w-dialog v-model="dialogVisible1" fullscreen />
</template>

<script>
  import wDialog from '/@/components/UI/Dialog/index.vue'
  import { ref, reactive, computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'DialogDemo',

    components: { wDialog },

    setup(props, { attrs }) {
      const dialogVisible1 = ref(false)

      const onOpenDialog = () => {
        dialogVisible1.value = true
      }

      return {
        dialogVisible1,
        onOpenDialog,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
