<template>
  <div>
    <div>Role</div>
    <el-input v-model="v"></el-input>
  </div>
</template>

<script>
  import { ref, reactive, defineComponent } from 'vue'
  export default defineComponent({
    name: 'Role',
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
