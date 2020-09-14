<template>
  <div class="center-item">
    <p>w-time select当前绑定值：{{ time1 }}</p>
    <w-time v-model="time1" type="select" placeholder="请选择时间"></w-time>

    <p>w-time picker当前绑定值：{{ time2 }}</p>
    <w-time v-model="time2" type="picker" placeholder="请选择时间"></w-time>
  </div>
</template>

<script>
import wTime from "@/components/UI/Time";

export default {
  name: "",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: { wTime },

  mixins: [],

  data() {
    return {
      time1: "",
      time2: "",
      time3: "",
      time4: "",
      time5: ""
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