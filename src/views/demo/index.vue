<template>
  <div>
    <el-tabs v-model="activeTabName" tab-position="left" style="margin: 20px;">
      <el-tab-pane label="Icon" name="Icon">
        <icon-demo></icon-demo>
      </el-tab-pane>

      <el-tab-pane label="Button" name="Button">
        <button-demo></button-demo>
      </el-tab-pane>

      <el-tab-pane label="Input" name="Input">
        <input-demo></input-demo>
      </el-tab-pane>

      <el-tab-pane label="InputNumber" name="InputNumber">
        <input-number-demo></input-number-demo>
      </el-tab-pane>

      <el-tab-pane label="Radio" name="Radio">
        <radio-demo></radio-demo>
      </el-tab-pane>

      <el-tab-pane label="Checkbox" name="Checkbox">
        <checkbox-demo></checkbox-demo>
      </el-tab-pane>

      <el-tab-pane label="Select" name="Select">
        <select-demo></select-demo>
      </el-tab-pane>

      <el-tab-pane label="Date" name="Date">
        <date-demo></date-demo>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang='ts'>
import IconDemo from "./Icon.vue";
import ButtonDemo from "./Button.vue";
import CheckboxDemo from "./Checkbox.vue";
import DateDemo from "./Date.vue";
import InputDemo from "./Input.vue";
import InputNumberDemo from "./InputNumber.vue";
import RadioDemo from "./Radio.vue";
import SelectDemo from "./Select.vue";
import { ref, reactive, defineComponent } from "vue";

export default defineComponent({
  name: "Demo",

  components: {
    IconDemo,
    ButtonDemo,
    CheckboxDemo,
    DateDemo,
    InputDemo,
    InputNumberDemo,
    RadioDemo,
    SelectDemo
  },

  setup() {
    const activeTabName = ref("Icon");

    return {
      activeTabName
    };
  }
});
</script>

<style lang='scss' scoped>
</style>