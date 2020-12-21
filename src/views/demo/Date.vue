<template>
  <el-card>
    <template #header>
      <span>time-picker 基础，当前绑定值：【{{ time1 }}】</span>
    </template>

    <w-time-picker
      v-model="time1"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
    ></w-time-picker>
    <w-time-picker
      v-model="time1"
      arrow-control
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
    ></w-time-picker>
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>time-picker 范围，当前绑定值：【{{ time2 }}】</span>
    </template>

    <w-time-picker
      v-model="time2"
      is-range
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      placeholder="选择时间范围"
    ></w-time-picker>
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>time-select 基础，当前绑定值：【{{ time3 }}】</span>
    </template>

    <w-time-select
      v-model="time3"
      :picker-options="{
        start: '09:30',
        step: '00:15',
        end: '19:30'
      }"
    ></w-time-select>
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>date-select 基础，当前绑定值：【{{ time4 }}】</span>
    </template>

    <w-date-picker v-model="time4"></w-date-picker>
  </el-card>

  <br />
</template>

<script>
import wTimePicker from "/@/components/UI/TimePicker/index.vue";
import wTimeSelect from "/@/components/UI/TimeSelect/index.vue";
import wDatePicker from "/@/components/UI/DatePicker/index.vue";
import { ref, reactive, computed, defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "DateDemo",

  components: {
    wTimePicker,
    wTimeSelect,
    wDatePicker
  },

  setup(props, { attrs }) {
    const state = reactive({
      time1: "",
      time2: "",
      time3: "",
      time4: "",
      time5: "",
      time6: "",
      time7: "",
      time8: ""
    });

    const makeRange = (start, end) => {
      const result = [];
      for (let i = start; i <= end; i++) {
        result.push(i);
      }
      return result;
    };

    // 禁用 除了17点18点以外的小时
    const disabledHours = () => {
      return makeRange(0, 16).concat(makeRange(19, 23));
    };

    // 17点 禁用前半小时 18点 禁用后半小时
    const disabledMinutes = hour => {
      if (hour === 17) {
        return makeRange(0, 29);
      }
      if (hour === 18) {
        return makeRange(31, 59);
      }
    };

    // 禁用18点30分前30秒
    const disabledSeconds = (hour, minute) => {
      if (hour === 18 && minute === 30) {
        return makeRange(1, 30);
      }
    };

    return {
      ...toRefs(state),
      disabledHours,
      disabledMinutes,
      disabledSeconds
    };
  }
});
</script>

<style lang='scss' scoped>
</style>