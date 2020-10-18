<template>
  <el-collapse-item title="Header" name="header">
    <template slot="title">
      <div class="drawer-item">
        <h5>Header</h5>
      </div>
    </template>

    <div class="drawer-item">
      <span>Render</span>
      <el-switch v-model="headerRender" class="drawer-switch" />
    </div>

    <div class="drawer-item">
      <span>Fixed</span>
      <el-switch v-model="headerFixed" :disabled="!headerRender" class="drawer-switch" />
    </div>

    <div class="drawer-item">
      <span>Height</span>

      <el-slider
        style="width:80%;margin:auto;"
        v-model="headerHeight"
        :show-tooltip="false"
        :min="50"
        :max="120"
        :step="10"
        :marks="headerMarks"
      ></el-slider>
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
      headerMarks: {
        50: "50px",
        70: "70px",
        90: "90px",
        110: "110px",
        130: "130px"
      }
    };
  },

  computed: {
    headerRender: {
      get() {
        return this.$store.state.settings.headerRender;
      },
      set(val) {
        if (!val) {
          this.$store.dispatch("settings/changeSettings", {
            key: "headerFixed",
            value: val
          });
        }

        this.$store.dispatch("settings/changeSettings", {
          key: "headerRender",
          value: val
        });
      }
    },

    headerFixed: {
      get() {
        return this.$store.state.settings.headerFixed;
      },
      set(val) {
        this.$store.dispatch("settings/changeSettings", {
          key: "headerFixed",
          value: val
        });
      }
    },

    headerHeight: {
      get() {
        return parseInt(this.$store.state.settings.headerHeight);
      },
      set(val) {
        this.$store.dispatch("settings/changeSettings", {
          key: "headerHeight",
          value: val + "px"
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