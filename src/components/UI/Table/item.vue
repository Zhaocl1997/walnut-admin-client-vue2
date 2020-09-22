<template>
  <div>
    <li v-for="(item, index) in header" :key="item.prop" @click.stop.prevent="onClick(index)">
      <div class="pointer" @mouseover="onMouseOver(index)" @mouseleave="onMouseLeave(index)">
        <w-icon :icon="mainIcon" style="cursor:move;"></w-icon>

        <el-checkbox v-model="item.show" :disabled="item.disabled">
          <span class="one-line" style="max-width:150px;padding-right:20px;">{{ item.label }}</span>
        </el-checkbox>

        <div style="float:right;" v-show="item.visible">
          <el-tooltip content="不固定" placement="top">
            <w-icon v-if="item.fixed" icon="vertical-align-middl" @click.stop="onReset(index)"></w-icon>
          </el-tooltip>

          <el-tooltip content="固定在列首" placement="top">
            <w-icon
              v-if="item.fixed !== 'left'"
              icon="vertical-align-top"
              @click.stop="onSetStart(index)"
            ></w-icon>
          </el-tooltip>

          <el-tooltip content="固定在列尾" plalcement="top">
            <w-icon
              v-if="item.fixed !== 'right'"
              icon="vertical-align-botto"
              @click.stop="onSetEnd(index)"
            ></w-icon>
          </el-tooltip>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: "wTableColumnItem",

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
    mainIcon: String,
    header: Array
  },

  methods: {
    onClick(i) {
      this.header[i].show = !this.header[i].show;
      this.$emit("change", this.header[i]);
    },
    onSetStart(i) {
      this.header[i].fixed = "left";
      this.$emit("change", this.header[i]);
    },
    onSetEnd(i) {
      this.header[i].fixed = "right";
      this.$emit("change", this.header[i]);
    },
    onReset(i) {
      this.header[i].fixed = "";
      this.$emit("change", this.header[i]);
    },
    onMouseOver(i) {
      this.header[i].visible = true;
    },
    onMouseLeave(i) {
      this.header[i].visible = false;
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