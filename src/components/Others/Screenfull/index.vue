<template>
  <w-icon
    pointer
    :width="width"
    :icon="isFullscreen ? 'fullscreenExit' : 'fullscreen'"
    @click="onClick"
  ></w-icon>
</template>

<script>
import screenfull from "screenfull";
import { ref, defineComponent, onMounted, onUnmounted } from "vue";

export default defineComponent({
  name: "wScreenfull",

  props: {
    target: {
      type: String,
      default: "#app"
    },

    width: {
      type: String,
      default: "24px"
    }
  },

  setup(props, { attrs }) {
    const isFullscreen = ref(false);

    const change = () => {
      isFullscreen.value = screenfull.isFullscreen;
    };

    const init = () => {
      if (screenfull.isEnabled) {
        screenfull.on("change", change);
      }
    };

    const destroy = () => {
      if (screenfull.isEnabled) {
        screenfull.off("change", change);
      }
    };

    const onClick = () => {
      if (!screenfull.isEnabled) {
        alert("您的浏览器不支持全屏");
        return false;
      }

      const ele = document.querySelector(props.target);
      screenfull.toggle(ele);
    };

    onMounted(() => {
      init();
    });

    onUnmounted(() => {
      destroy();
    });

    return {
      isFullscreen,
      onClick
    };
  }
});
</script>

<style lang='scss' scoped>
</style>