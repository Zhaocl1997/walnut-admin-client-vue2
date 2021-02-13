<template>
  <div>
    <div>User</div>
    <el-input v-model="v"></el-input>
  </div>
</template>

<script>
  import { ref, reactive, defineComponent } from 'vue'
  export default defineComponent({
    name: 'User',
    components: {},
    setup() {
      const v = ref()
      return {
        v,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
