<template>
  <div></div>
</template>

<script lang='ts'>
import { ref, reactive, computed, defineComponent } from "vue";

const k = {
  u: "API_TEST_URL",
  k: "API_TEST_KEY",
  v: "API_TEST_VALUE"
};

export default defineComponent({
  name: "wAPI",

  props: {},

  components: {},

  setup(props, { attrs }) {
    const form = reactive({});
    const result = reactive({});
  }
});
</script>

<style lang='scss' scoped>
</style>