<template>
  <el-card>
    <template #header>
      <span>基本</span>
    </template>

    <w-icon icon="home" />

    <br />

    <w-icon icon="home" width="40" />
    <w-icon icon="home" height="80" />

    <br />

    <w-icon icon="home" horizontal-flip />
    <w-icon icon="home" vertical-flip />

    <br />

    <w-icon icon="home" rotate="1" />
    <w-icon icon="home" rotate="2" />
    <w-icon icon="home" rotate="3" />

    <br />

    <w-icon icon="home" color="red" />
    <w-icon icon="home" color="green" />
    <w-icon icon="home" color="blue" />

    <br />

    <w-icon
      icon="home"
      width="40"
      height="24"
      horizontal-align="left"
      class="iconify"
    />
    <w-icon
      icon="home"
      width="40"
      height="24"
      horizontal-align="center"
      class="iconify"
    />
    <w-icon
      icon="home"
      width="40"
      height="24"
      horizontal-align="right"
      class="iconify"
    />

    <br />

    <w-icon
      icon="home"
      width="24"
      height="40"
      align="left,slice"
      class="iconify"
    />
    <w-icon
      icon="home"
      width="24"
      height="40"
      align="center,slice"
      class="iconify"
    />
    <w-icon
      icon="home"
      width="24"
      height="40"
      align="right,slice"
      class="iconify"
    />

    <br />

    <w-icon
      icon="home"
      width="24"
      height="40"
      vertical-align="top"
      class="iconify"
    />
    <w-icon
      icon="home"
      width="24"
      height="40"
      vertical-align="middle"
      class="iconify"
    />
    <w-icon
      icon="home"
      width="24"
      height="40"
      vertical-align="bottom"
      class="iconify"
    />

    <br />

    <w-icon
      icon="home"
      width="40"
      height="24"
      align="top,slice"
      class="iconify"
    />
    <w-icon
      icon="home"
      width="40"
      height="24"
      align="middle,slice"
      class="iconify"
    />
    <w-icon
      icon="home"
      width="40"
      height="24"
      align="bottom,slice"
      class="iconify"
    />

    <br />

    <w-icon
      icon="home"
      width="40"
      height="24"
      align="left,top"
      class="iconify"
    />
    <w-icon
      icon="home"
      width="40"
      height="24"
      align="left,top,slice"
      class="iconify"
    />
  </el-card>

  <br />

  <el-card class="custom-sf">
    <template #header>
      <span>全屏 / 指定元素全屏 / 指定元素窗口内全屏</span>
    </template>

    <w-screen-full />

    <w-screen-full target=".custom-sf" />
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>箭头图标</span>
    </template>

    <w-arrow :active="active" @click="onToggleArrow"></w-arrow>
  </el-card>
</template>

<script>
  import wScreenFull from '/@/components/Help/Screenfull/index.vue'
  import wArrow from '/@/components/Help/Arrow/index.vue'
  import { ref, reactive, computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'IconDemo',

    components: { wScreenFull, wArrow },

    setup(props, { attrs }) {
      const active = ref(false)

      const onToggleArrow = () => {
        active.value = !active.value
      }

      return {
        active,
        onToggleArrow,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .iconify {
    box-shadow: 0 0 0 1px #e88;
  }
</style>
