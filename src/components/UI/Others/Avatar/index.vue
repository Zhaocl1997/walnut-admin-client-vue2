<template>
  <el-tooltip effect="dark" content="Avatar" placement="bottom">
    <el-avatar
      :src="url"
      alt="Avatar"
      :key="url"
      fit="cover"
      :size="24"
      class="inline avatar"
      @click="onClick"
    ></el-avatar>
  </el-tooltip>
</template>

<script>
export default {
  name: "wAvatar",

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

  props: {
    url: { type: String, required: true }
  },

  methods: {
    onClick(e) {
      this.$emit("click", e);
    }
  },

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
.avatar {
  height: 28px;
  width: 28px;
  vertical-align: -0.2em;
}
</style>