<template>
  <el-tooltip
    :disabled="!tooltip"
    :effect="tooltipEffect"
    :content="tooltipContent"
    :open-delay="parseInt(tooltipDelay)"
    :placement="tooltipPlacement"
  >
    <el-popover
      :disabled="!computedPopover"
      :title="popoverTitle"
      :content="popoverContent"
      :placement="popoverPlacement"
      :width="popoverWidth"
      :trigger="computedPopconfirmTrigger"
      v-model="popoverVisible"
    >
      <div v-if="popConfirm">
        <p style="margin: 3px;">{{ popoverContent }}</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="popoverVisible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="popoverConfirm">确定</el-button>
        </div>
      </div>

      <el-button
        v-bind="$props"
        :loading="selfLoading"
        :disabled="computedDisabled"
        @click="onClick"
        :style="style"
        slot="reference"
      >
        <span v-if="$slots.default">
          <slot v-if="!buttonText"></slot>
          <span v-else>{{ buttonText }}</span>
        </span>
      </el-button>
    </el-popover>
  </el-tooltip>
</template>

<script>
export default {
  name: "wButton",

  components: {},

  mixins: [],

  data() {
    return {
      popoverVisible: false,
      selfLoading: !this.loading,

      buttonText: "",
      buttonDelay: this.delay,
      buttonDisabled: this.disabled
    };
  },

  computed: {
    style() {
      if (this.block) {
        return "width:100%";
      } else if (this.width) {
        return `width:${this.width}`;
      } else {
        return `width:auto`;
      }
    },
    computedDisabled() {
      return this.buttonDelay !== "0" ? this.buttonDisabled : this.disabled;
    },
    computedPopover() {
      return this.popConfirm ? true : this.popover;
    },
    computedPopconfirmTrigger() {
      if (this.popConfirm) {
        return "click";
      }
      return this.popoverTrigger;
    }
  },

  watch: {},

  props: {
    // origin
    type: String,
    size: String,
    icon: String,
    nativeType: String,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,

    // custom
    delay: { type: String, default: "0" },
    loading: { type: String, default: "0" },

    block: Boolean,
    width: String,

    tooltip: { type: Boolean, default: false },
    tooltipEffect: { type: String, default: "dark" },
    tooltipContent: { type: String, default: "tooltipContent" },
    tooltipDelay: { type: String, default: "100" },
    tooltipPlacement: { type: String, default: "top-start" },

    popover: { type: Boolean, default: false },
    popoverWidth: { type: String, default: "200" },
    popoverTitle: { type: String, default: "popoverTitle" },
    popoverContent: { type: String, default: "popoverContent" },
    popoverPlacement: { type: String, default: "top" },
    popoverTrigger: { type: String, default: "hover" },

    popConfirm: { type: Boolean, default: false }
  },

  methods: {
    onClick(e) {
      if (this.buttonDelay !== "0") {
        this.buttonDisabled = true;
        let interval = window.setInterval(() => {
          this.buttonText = "（" + this.buttonDelay + "秒）后重试";
          --this.buttonDelay;
          if (this.buttonDelay < 0) {
            this.buttonText = this.$slots.default[0].text;
            this.buttonDelay = this.delay;
            this.buttonDisabled = false;
            window.clearInterval(interval);
          }
        }, 1000);
      }

      if (this.loading !== "0") {
        this.selfLoading = true;

        setTimeout(() => {
          this.selfLoading = false;
        }, this.loading * 1000);
      }

      this.$emit("click", e);
    },

    popoverConfirm() {
      this.popoverVisible = false;
      this.$emit("popoverConfirm");
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