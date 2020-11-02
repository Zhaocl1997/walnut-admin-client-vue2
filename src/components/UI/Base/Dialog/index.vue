<template>
  <el-dialog
    class="w-dialog"
    :visible.sync="visible"
    :title="dialogTitle"
    :width="width"
    :fullscreen="isFullscreen"
    :center="center"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="destroyOnClose"
    :top="top"
    append-to-body
    @close="onCancel"
    v-dialogDrag="dialogDrag"
  >
    <div slot="title">
      <span class="w-dialog__title">{{ dialogTitle }}</span>

      <el-tooltip class="ml5" effect="dark" content="按住标题可拖拽" placement="right">
        <i class="el-icon-question" style="color:grey;"></i>
      </el-tooltip>

      <div class="w-dialog__header-right">
        <div v-if="isMinimize" class="w-dialog__header-right-minimize">
          <w-icon icon="minimize" @click="onMinimize"></w-icon>
        </div>

        <div class="w-dialog__header-right-restore">
          <w-icon
            :icon="isFullscreen || !isMinimize ? 'restore' : 'maximize'"
            @click="onToggleRestoreAndMax"
          ></w-icon>
        </div>
      </div>
    </div>

    <div v-if="isMinimize" class="w-dialog__body">
      <slot></slot>
    </div>

    <div v-if="footer && isMinimize" slot="footer">
      <w-button size="small" style="margin-right:8px;" @click="onCancel">{{ cancelText }}</w-button>
      <slot name="dialogButton" />
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
    return {
      isFullscreen: false,
      isMinimize: true,
      target: {},
      initStyle: {
        height: "",
        width: ""
      }
    };
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
    dialogTitle: String,
    confirmText: { type: String, default: "确 定" },
    cancelText: { type: String, default: "取 消" },

    width: { type: String, default: "30%" },
    top: { type: String, default: "6vh" },
    center: { type: Boolean, default: false },
    destroyOnClose: Boolean,

    loading: { type: String, default: "5" },
    footer: Boolean,

    dialogDrag: {
      type: Array,
      default: () => ["draggable", "dragwidth"]
      // validator: function(value) {
      //   return ["draggable", "fullscreen", "dragwidth"].includes(value);
      // }
    }
  },

  methods: {
    onConfirm() {
      this.$emit("confirm");
    },

    onCancel() {
      this.$emit("cancel");
      // this.isFullscreen = false;
      // this.onRestore();
    },

    init() {
      this.target = document.querySelector(".el-dialog");
      this.initStyle.height = this.target.style.height;
      this.initStyle.width = this.target.style.width;
    },

    initial() {
      this.target.style.left = 0;
      this.target.style.top = 0;
    },

    onMinimize() {
      const target = this.initial();
      this.target.style.height = "50px";
      this.target.style.width = this.initStyle.width;
      this.target.style.overflowY = "hidden";
      this.isMinimize = false;
      this.isFullscreen = false;
    },

    onToggleRestoreAndMax() {
      if (!this.isMinimize && !this.isFullscreen) {
        this.onRestore();
      } else {
        this.onMaximize();
      }
    },

    onRestore() {
      const target = this.initial();
      this.target.style.height = this.initStyle.height;
      this.isMinimize = true;
    },

    onMaximize() {
      const target = this.initial();
      this.isFullscreen = !this.isFullscreen;
    }
  },

  created() {},

  mounted() {
    this.init();
  },

  beforeCreate() {},

  beforeMount() {},

  beforeUpdate() {},

  updated() {},

  beforeDestroy() {},

  destroyed() {},

  activated() {}
};
</script>

<style lang="scss" scoped>
.w-dialog {
  &__header-right {
    float: right;
    color: #909399;
    font-weight: 100;
    font-size: 11px;
    position: relative;

    &-minimize {
      position: absolute;
      top: 1px;
      right: 39px;
      cursor: pointer;
      &:hover {
        color: #1890ff;
      }
    }

    &-restore {
      position: absolute;
      top: 1px;
      right: 20px;
      cursor: pointer;
      &:hover {
        color: #1890ff;
      }
    }
  }

  &__body {
    max-height: 70vh;
    overflow-y: auto;

    margin-bottom: 63px;

    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }

    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      background: #535353;
    }

    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      border-radius: 10px;
      background: #ededed;
    }
  }

  ::v-deep .el-dialog__header {
    border-bottom: 1px solid #e8eaec;
  }

  ::v-deep .el-dialog__footer {
    border-top: 1px solid #e8eaec;
    position: absolute;
    width: 100%;
    bottom: 0;
  }
}
</style>