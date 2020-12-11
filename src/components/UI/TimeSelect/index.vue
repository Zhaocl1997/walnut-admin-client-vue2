<template>
  <el-time-select v-bind="getBindValue"></el-time-select>
</template>

<script lang='ts'>
import { ElTimeSelect } from "element-plus";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "wTimeSelect",

  props: {
    ...ElTimeSelect.props
  },

  setup(props, { attrs }) {
    const getBindValue = computed(() => {
      return { ...attrs, ...props };
    });

    return {
      getBindValue
    };
  }
});
</script>

<style lang='scss' scoped>
</style>