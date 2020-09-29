<template>
  <div class="center-item">
    <p>w-switch 当前绑定值：{{ switch1 }}</p>
    <w-switch v-model="switch1"></w-switch>

    <p>w-switch 当前绑定值：{{ switch2 }}</p>
    <w-switch v-model="switch2" active-text="按月付费" inactive-text="按年付费"></w-switch>

    <p>w-switch 当前绑定值：{{ switch3 }}</p>
    <w-switch
      v-model="switch3"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-value="100"
      inactive-value="0"
    ></w-switch>
  </div>
</template>

<script>
import wSwitch from "@/components/UI/Base/Switch";

export default {
  name: "",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: { wSwitch },

  mixins: [],

  data() {
    return {
      switch1: false,
      switch2: false,
      switch3: false,
      switch4: false
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