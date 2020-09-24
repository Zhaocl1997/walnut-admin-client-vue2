<template>
  <div>
    <h1>User</h1>
  </div>
</template>

<script>
import { getUserList } from "@/api/system/user";

export default {
  name: "User",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: {},

  mixins: [],

  data() {
    return {};
  },

  computed: {},

  watch: {},

  props: {},

  methods: {},

  created() {},

  mounted() {
    getUserList().then(res => {
      console.log(res);
    });
  },

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