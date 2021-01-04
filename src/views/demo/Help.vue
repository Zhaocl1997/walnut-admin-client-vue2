<template>
  <el-card>
    <template #header>
      <span>国际化</span>
    </template>

    <w-locale-picker></w-locale-picker>
  </el-card>
</template>

<script>
  import { ref, reactive, computed, defineComponent } from 'vue'
  import wLocalePicker from '/@/components/Help/App/Locale/index.vue'

  export default defineComponent({
    name: 'HelpDemo',

    components: { wLocalePicker },

    setup(props, { attrs }) {},
  })
</script>

<style lang="scss" scoped></style>
