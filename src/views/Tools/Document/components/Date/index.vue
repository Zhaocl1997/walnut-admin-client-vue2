<template>
  <div class="center-item">
    <p>w-date 当前绑定值：{{ date1 }}</p>
    <w-date v-model="date1" placeholder="普通年月日"></w-date>

    <p>w-date 当前绑定值：{{ date2 }}</p>
    <w-date v-model="date2" type="daterange" placeholder="时间区间"></w-date>
  </div>
</template>

<script>
import wDate from "@/components/UI/Date";

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