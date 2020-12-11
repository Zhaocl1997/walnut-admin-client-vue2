<template>
  <Icon :icon="icons[icon]" />
</template>

<script lang='ts'>
import { Icon, InlineIcon, addCollection } from "@iconify/vue";
import homeIcon from "@iconify-icons/mdi-light/home";

import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "wIcon",

  components: { Icon, InlineIcon },

  props: {
    ...Icon.props,

    icon: String
  },

  setup(props, { attrs }) {
    const icons = reactive({
      home: homeIcon
    });

    return { icons };
  }
});
</script>

<style lang='scss' scoped>
</style>