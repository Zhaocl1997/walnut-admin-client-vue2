<template>
  <div class="inline avatar" @click="onClick">
    <el-tooltip effect="dark" content="用户头像" placement="bottom">
      <el-avatar :src="url" alt="用户头像" :key="url" fit="cover" :size="24" style="cursor:pointer;"></el-avatar>
    </el-tooltip>
  </div>
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
:focus {
  outline: 0;
}
</style>