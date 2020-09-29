<template>
  <div class="center-item">
    <p>w-icon-select 当前绑定值：{{ iconSelect }}</p>
    <w-icon-select v-model="iconSelect"></w-icon-select>
  </div>
</template>

<script>
import wIconSelect from "@/components/UI/Others/IconSelect";

export default {
  name: "",

  components: { wIconSelect },

  mixins: [],

  data() {
    return {
      iconSelect: ""
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