<template>
  <el-card>
    <template #header>
      <span>单选-基本，当前绑定值：【{{ state.select1 }}】</span>
    </template>

    <w-select v-model="state.select1" :options="options"></w-select>
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>多选-基本，当前绑定值：【{{ state.select2 }}】</span>
    </template>

    <w-select v-model="state.select2" multiple :options="options"></w-select>
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>多选-对象，当前绑定值：【{{ state.select3 }}】</span>
    </template>

    <w-select v-model="state.select3" multiple :options="options" value-key="value"></w-select>
  </el-card>

  <br />

  <!-- <el-card>
    <template #header>
      <span>多选-字符串，当前绑定值：【{{ state.select4 }}】</span>
    </template>

    <w-select v-model="state.select4" multiple :options="options" value-format=","></w-select>
  </el-card>

  <br /> -->
</template>

<script>
import wSelect from "/@/components/UI/Select/index.vue";
import { ref, reactive, defineComponent } from "vue";

export default defineComponent({
  name: "SelectDemo",

  components: { wSelect },

  setup() {
    const state = reactive({
      select1: "value-1",
      select2: ["value-1", "value-2"],
      select3: [
        { value: "value-1", label: "label-1" },
        { value: "value-2", label: "label-2" }
      ],
      select4: "",
      select5: [],
      select6: []
    });

    const options = [];

    for (let i = 0; i < 100; i++) {
      options.push({
        value: `value-${i + 1}`,
        label: `label-${i + 1}`
      });
    }

    return {
      state,

      options
    };
  }
});
</script>

<style lang='scss' scoped>
</style>