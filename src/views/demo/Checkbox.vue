<template>
  <el-card>
    <template #header>
      <span>基本，当前绑定值：【{{ checkbox1 }}】</span>
    </template>

    <w-checkbox v-model="checkbox1">记住密码</w-checkbox>
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>多选-基本，当前绑定值：【{{ checkbox2 }}】</span>
    </template>

    <w-checkbox v-model="checkbox2" :options="options"></w-checkbox>
  </el-card>

  <br />
</template>

<script lang='ts'>
import wCheckbox from "/@/components/UI/Checkbox/index.vue";
import { reactive, defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "CheckboxDemo",

  components: { wCheckbox },

  setup() {
    const state = reactive({
      checkbox1: false,
      checkbox2: [],
      checkbox3: "",
      checkbox4: "",
      checkbox5: "",
      checkbox6: "",
      checkbox7: "",
      checkbox8: ""
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