<template>
  <div class="center-item">
    <p>w-editor 当前绑定值：{{ visible }}</p>
    <w-button @click="onDialog">打开dialog</w-button>

    <w-dialog
      :dialogVisible.sync="visible"
      dialogTitle="dialog-title"
      @cancel="visible = false"
      @confirm="visible = true"
    >
      <h1>123123</h1>
      <h1>123123</h1>
      <h1>123123</h1>
      <h1>123123</h1>
      <h1>123123</h1>
      <h1>123123</h1>
    </w-dialog>
  </div>
</template>

<script>
import wButton from "@/components/UI/Base/Button";
import wDialog from "@/components/UI/Base/Dialog";

export default {
  name: "",

  components: { wButton, wDialog },

  mixins: [],

  data() {
    return {
      visible: false
    };
  },

  computed: {},

  watch: {},

  props: {},

  methods: {
    onDialog() {
      this.visible = true;
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