<template>
  <div class="u-mb8 u-float-right">
    <w-refresh :listFunc="listFunc"></w-refresh>
  </div>
</template>

<script lang='ts'>
import { ref, reactive, computed, defineComponent } from "vue";

import wRefresh from "./refresh.vue";

export default defineComponent({
  name: "wTableSettings",

  props: {
    ...wRefresh.props
  },

  components: { wRefresh },

  setup(props, { attrs }) {}
});
</script>

<style lang='scss' scoped>
</style>