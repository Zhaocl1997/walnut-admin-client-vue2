<template>
  <el-dialog
    :visible.sync="visible"
    :title="dialogTitle"
    :width="width"
    :fullscreen="fullscreen"
    :center="center"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="destroyOnClose"
    :top="top"
    append-to-body
    @close="onCancel"
    v-dialogDrag="dialogDrag"
  >
    <slot></slot>

    <div slot="title">
      <span>{{ dialogTitle }}</span>
      <el-tooltip
        v-if="dialogDrag.includes('fullscreen')"
        class="ml8"
        effect="dark"
        content="双击头部可全屏对话框"
        placement="right"
      >
        <i class="el-icon-question"></i>
      </el-tooltip>
    </div>

    <div slot="footer" v-if="footer">
      <w-button size="small" style="margin-right:8px;" @click="onCancel">{{ cancelText }}</w-button>
      <w-button type="primary" size="small" @click="onConfirm" :loading="loading">{{ confirmText }}</w-button>
    </div>
  </el-dialog>
</template>

<script>
import wButton from "../Button";

export default {
  name: "wDialog",

  components: { wButton },

  mixins: [],

  data() {
    return {};
  },

  computed: {
    visible: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this.$emit("update:dialogVisible", val);
      }
    }
  },

  watch: {},

  props: {
    dialogVisible: { type: Boolean, required: true, default: false },
    dialogTitle: { type: String, required: true, default: "" },
    confirmText: { type: String, default: "确 定" },
    cancelText: { type: String, default: "取 消" },

    width: { type: String, default: "30%" },
    top: String,
    fullscreen: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    destroyOnClose: Boolean,

    loading: { type: String, default: "0" },
    footer: Boolean,
    dialogDrag: { type: Array, default: () => [] }
  },

  methods: {
    onConfirm() {
      this.$emit("confirm");
    },
    onCancel() {
      this.$emit("cancel");
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

<style>
.el-dialog__header {
  border-bottom: 1px solid #e8eaec;
}
.el-dialog__body {
  margin-bottom: 63px;
}
.el-dialog__footer {
  border-top: 1px solid #e8eaec;
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>