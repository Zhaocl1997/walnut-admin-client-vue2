<template>
  <el-collapse-item title="Header" name="header">
    <template slot="title">
      <div class="drawer-item">
        <h5>Header</h5>
      </div>
    </template>

    <div class="drawer-item">
      <span>Render</span>
      <el-switch v-model="headerRender" class="u-float-right" />
    </div>

    <div class="drawer-item">
      <span>Fixed</span>
      <el-switch v-model="headerFixed" class="u-float-right" />
    </div>
  </el-collapse-item>
</template>

<script>
export default {
  name: "",

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
      headerId: "header-container",
      headerFixedClass: "header-fixed",
      dispatchSettings: "settings/changeSettings"
    };
  },

  computed: {
    /* render */
    headerRender: {
      get() {
        return this.$store.state.settings.headerRender;
      },
      set(val) {
        if (!val) {
          this.$store.dispatch(this.dispatchSettings, {
            key: "headerFixed",
            value: val
          });
        }

        this.$store.dispatch(this.dispatchSettings, {
          key: "headerRender",
          value: val
        });
      }
    },

    /* fixed */
    headerFixed: {
      get() {
        return this.$store.state.settings.headerFixed;
      },
      set(val) {
        if (val) {
          this.$store.dispatch(this.dispatchSettings, {
            key: "headerRender",
            value: val
          });
        }

        this.$store.dispatch(this.dispatchSettings, {
          key: "headerFixed",
          value: val
        });
      }
    }
  },

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