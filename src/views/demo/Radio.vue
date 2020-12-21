<template>
  <el-card>
    <template #header>
      <span>基本，当前绑定值：【{{ radio1 }}】</span>
    </template>

    <w-radio v-model="radio1" :options="options"></w-radio>
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>按钮样式，当前绑定值：【{{ radio2 }}】</span>
    </template>

    <w-radio v-model="radio2" :options="options" button></w-radio>
  </el-card>

  <br />
</template>

<script>
import wRadio from "/@/components/UI/Radio/index.vue";
import { reactive, defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "RadioDemo",

  components: { wRadio },

  setup() {
    const state = reactive({
      radio1: "",
      radio2: "",
      radio3: "",
      radio4: "",
      radio5: "",
      radio6: "",
      radio7: "",
      radio8: ""
    });

    const options = [
      {
        value: "1",
        label: "北京",
        disabled: true
      },
      {
        value: "2",
        label: "上海"
      },
      {
        value: "3",
        label: "广州"
      },
      {
        value: "4",
        label: "深圳"
      }
    ];

    return {
      ...toRefs(state),
      options
    };
  }
});
</script>

<style lang='scss' scoped>
</style>