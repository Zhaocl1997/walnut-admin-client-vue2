<template>
  <el-collapse-item title="Footer" name="footer">
    <template slot="title">
      <div class="drawer-item">
        <h5>Footer</h5>
      </div>
    </template>

    <div class="drawer-item">
      <span>Render</span>
      <el-switch v-model="footerRender" class="u-float-right" />
    </div>

    <div class="drawer-item">
      <span>Fixed</span>
      <el-switch v-model="footerFixed" :disabled="!footerRender" class="u-float-right" />
    </div>

    <div class="drawer-item">
      <span>Height</span>

      <el-slider
        style="width:80%;margin:auto;"
        v-model="footerHeight"
        :show-tooltip="false"
        :min="20"
        :max="30"
        :step="5"
        :marks="footerMarks"
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
      footerMarks: {
        20: "20px",
        25: "25px",
        30: "30px"
      }
    };
  },

  computed: {
    /* render */
    footerRender: {
      get() {
        return this.$store.state.settings.footerRender;
      },
      set(val) {
        if (!val) {
          this.$store.dispatch("settings/changeSettings", {
            key: "footerFixed",
            value: val
          });
        }

        this.$store.dispatch("settings/changeSettings", {
          key: "footerRender",
          value: val
        });
      }
    },

    /* fixed */
    footerFixed: {
      get() {
        return this.$store.state.settings.footerFixed;
      },
      set(val) {
        this.$store.dispatch("settings/changeSettings", {
          key: "footerFixed",
          value: val
        });
      }
    },

    /* height */
    footerHeight: {
      get() {
        return parseInt(this.$store.state.settings.footerHeight);
      },
      set(val) {
        this.$store.dispatch("settings/changeSettings", {
          key: "footerHeight",
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