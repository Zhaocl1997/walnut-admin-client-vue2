<template>
  <div class="avatar-container">
    <el-avatar
      :src="url"
      alt="Avatar"
      :key="url"
      fit="cover"
      :size="24"
      class="avatar"
      @click="onClick"
    ></el-avatar>
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
</style>