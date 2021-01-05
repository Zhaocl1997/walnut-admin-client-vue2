<template>
  <el-card>
    <template #header>
      <span>国际化</span>

      <el-form inline>
        <el-form-item label="显示文字">
          <el-switch v-model="showText"></el-switch>
        </el-form-item>
      </el-form>
    </template>

    <w-locale-picker :showText="showText"></w-locale-picker>
  </el-card>

  <br />
  <el-card>
    <template #header>
      <span>标题</span>

      <el-form inline>
        <el-form-item label="显示左侧">
          <el-switch v-model="showLeft"></el-switch>
        </el-form-item>

        <el-form-item label="显示下划线">
          <el-switch v-model="showBottom"></el-switch>
        </el-form-item>
      </el-form>
    </template>

    <w-title :showLeft="showLeft" :showBottom="showBottom">一些标题</w-title>
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>箭头</span>

      <el-form inline>
        <el-form-item label="激活">
          <el-switch v-model="active"></el-switch>
        </el-form-item>
      </el-form>
    </template>

    <w-arrow :active="active"></w-arrow>
  </el-card>
</template>

<script>
  import { ref, reactive, computed, defineComponent, toRefs } from 'vue'
  import wLocalePicker from '/@/components/Help/App/Locale/index.vue'
  import wTitle from '/@/components/Help/Title/index.vue'
  import wArrow from '/@/components/Help/Arrow/index.vue'

  export default defineComponent({
    name: 'HelpDemo',

    components: { wLocalePicker, wTitle, wArrow },

    setup(props, { attrs }) {
      const state = reactive({
        showText: false,
        active: false,
        showLeft: false,
        showBottom: false,
      })

      return {
        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped></style>
