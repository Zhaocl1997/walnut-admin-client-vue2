<template>
  <div>
    <p>w-editor 当前绑定值：{{ editorValue }}</p>
    <w-editor v-model="editorValue"></w-editor>
  </div>
</template>

<script>
import wEditor from "@/components/UI/Base/Editor";

export default {
  name: "",

  components: { wEditor },

  mixins: [],

  data() {
    return {
      editorValue: ""
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