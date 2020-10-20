<template>
  <div class="center-item">
    <p>w-icon-select 当前绑定值：{{ iconSelect }}</p>
    <w-select-icon v-model="iconSelect"></w-select-icon>
  </div>
</template>

<script>
import wSelectIcon from "@/components/UI/Others/SelectIcon";

export default {
  name: "",

  components: { wSelectIcon },

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