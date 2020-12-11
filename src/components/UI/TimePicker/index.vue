<template>
  <el-time-picker v-bind="getBindValue"></el-time-picker>
</template>

<script lang='ts'>
import { ElTimePicker } from "element-plus";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "wTimePicker",

  props: {
    ...ElTimePicker.props
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