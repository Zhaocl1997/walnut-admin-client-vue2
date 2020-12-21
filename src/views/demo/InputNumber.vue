<template>
  <el-card>
    <template #header>
      <span>基本，当前绑定值：【{{ inputNumber1 }}】</span>
    </template>

    <w-input-number
      v-model="inputNumber1"
      :min="1"
      :max="10"
    />
  </el-card>

  <br>

  <el-card>
    <template #header>
      <span>步数，当前绑定值：【{{ inputNumber2 }}】</span>
    </template>

    <w-input-number
      v-model="inputNumber2"
      :step="2"
    />
  </el-card>

  <br>

  <el-card>
    <template #header>
      <span>严格步数，当前绑定值：【{{ inputNumber3 }}】</span>
    </template>

    <w-input-number
      v-model="inputNumber3"
      :step="2"
      step-strictly
    />
  </el-card>

  <br>

  <el-card>
    <template #header>
      <span>精度，当前绑定值：【{{ inputNumber4 }}】</span>
    </template>

    <w-input-number
      v-model="inputNumber4"
      :precision="2"
      :step="0.1"
    />
  </el-card>

  <br>

  <el-card>
    <template #header>
      <span>按钮位置，当前绑定值：【{{ inputNumber5 }}】</span>
    </template>

    <w-input-number
      v-model="inputNumber5"
      controls-position="right"
    />
  </el-card>

  <br>
</template>

<script>
import wInputNumber from "/@/components/UI/InputNumber/index.vue";
import { toRefs, reactive, defineComponent } from "vue";

export default defineComponent({
  name: "InputNumberDemo",

  components: { wInputNumber },

  setup() {
    const state = reactive({
      inputNumber1: 1,
      inputNumber2: 1,
      inputNumber3: 2,
      inputNumber4: 1,
      inputNumber5: 1,
      inputNumber6: 1,
      inputNumber7: 1,
      inputNumber8: 1
    });

    return toRefs(state);
  }
});
</script>

<style lang='scss' scoped>
</style>