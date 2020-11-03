<template>
  <el-collapse-item title="Tags" name="tags">
    <template slot="title">
      <div class="drawer-item">
        <h5>Tags</h5>
      </div>
    </template>

    <div class="drawer-item">
      <span>Render</span>
      <el-switch v-model="tagsRender" class="u-float-right" />
    </div>

    <!-- <div class="drawer-item">
      <span>Fixed</span>
      <el-switch v-model="tagsFixed" class="u-float-right" />
    </div> -->

    <div class="drawer-item">
      <span>Height</span>

      <el-slider
        style="width:80%;margin:auto;"
        v-model="tagsHeight"
        :show-tooltip="false"
        :min="20"
        :max="40"
        :step="5"
        :marks="tagsMarks"
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
      tagsMarks: {
        20: "20px",
        25: "25px",
        30: "30px",
        35: "35px",
        40: "40px"
      }
    };
  },

  computed: {
    tagsRender: {
      get() {
        return this.$store.state.settings.tagsRender;
      },
      set(val) {
        if (!val) {
          this.$store.dispatch("settings/changeSettings", {
            key: "headerFixed",
            value: val
          });
        }

        this.$store.dispatch("settings/changeSettings", {
          key: "tagsRender",
          value: val
        });
      }
    },

    tagsFixed: {
      get() {
        return this.$store.state.settings.tagsFixed;
      },
      set(val) {
        this.$store.dispatch("settings/changeSettings", {
          key: "tagsFixed",
          value: val
        });
      }
    },

    tagsHeight: {
      get() {
        return parseInt(this.$store.state.settings.tagsHeight);
      },
      set(val) {
        this.$store.dispatch("settings/changeSettings", {
          key: "tagsHeight",
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