<template>
  <div class="skin-container">
    <el-dropdown trigger="click" @command="onSetSkin">
      <div style="font-size:24px;">
        <w-icon icon="skin"></w-icon>
      </div>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="item of skinOptions"
          :key="item.value"
          :disabled="skin === item.value"
          :command="item.value"
        >{{ item.label }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "wSkin",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: {},

  mixins: [],

  data() {
    return {
      skin: "blue",

      skinOptions: [
        { label: "深空蓝", value: "blue" },
        { label: "青铜绿", value: "green" }
      ]
    };
  },

  computed: {},

  watch: {},

  props: {},

  methods: {
    onSetSkin(skin) {
      document.body.className = `skin-${skin}`;
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