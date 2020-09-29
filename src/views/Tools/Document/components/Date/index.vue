<template>
  <div class="center-item">
    <p>w-date 日期：{{ date1 }}</p>
    <w-date v-model="date1" type="date" placeholder="选择日期"></w-date>

    <p>w-date 日期时间：{{ date2 }}</p>
    <w-date v-model="date2" type="datetime" placeholder="选择日期时间"></w-date>

    <p>w-date 日期范围：{{ date3 }}</p>
    <w-date v-model="date3" type="daterange"></w-date>

    <p>w-date 日期时间范围：{{ date4 }}</p>
    <w-date v-model="date4" type="datetimerange"></w-date>

    <p>w-date 周：{{ date5 }}</p>
    <w-date v-model="date5" type="week" format="yyyy 第 WW 周" placeholder="选择周"></w-date>

    <p>w-date 月{{ date6 }}</p>
    <w-date v-model="date6" type="month" placeholder="选择月"></w-date>

    <p>w-date 年{{ date7 }}</p>
    <w-date v-model="date7" type="year" placeholder="选择年"></w-date>
  </div>
</template>

<script>
import wDate from "@/components/UI/Base/Date";

export default {
  name: "",

  components: { wDate },

  mixins: [],

  data() {
    return {
      date1: "",
      date2: "",
      date3: "",
      date4: "",
      date5: "",
      date6: "",
      date7: ""
    };
  },

  computed: {},

  watch: {},

  props: {},

  methods: {},

  created() {},

  mounted() {},

  beforeCreate() {},

  beforeMount() {},

  beforeUpdate() {},

  updated() {},

  beforeDestroy() {},

  destroyed() {},

  activated() {}
};
</script>

<style scoped>
</style>