<template>
  <div ref="wTag" class="wTag">
    <el-tag
      v-for="tag in tagArr"
      :key="tag"
      :hit="hit"
      :size="size"
      :type="type"
      :color="color"
      :effect="effect"
      :closable="closable"
      :disable-transitions="false"
      @click="onClick"
      @close="onClose(tag)"
    >{{ tag }}</el-tag>

    <template v-if="addable">
      <w-input
        ref="saveTagInput"
        class="input-new-tag"
        size="small"
        v-if="inputVisible"
        v-model="inputValue"
        :width="inputWidth"
        @keyup="onInputConfirm"
        @blur="onInputConfirm"
      ></w-input>

      <w-button
        v-else
        size="small"
        circle
        class="button-new-tag"
        icon="el-icon-circle-plus-outline"
        @click="onShowInput"
      ></w-button>
    </template>
  </div>
</template>

<script>
import Sortable from "sortablejs";

import wButton from "../Button";
import wInput from "../Input";
import { isEmpty } from "@/utils";

export default {
  name: "wTag",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: { wButton, wInput },

  mixins: [],

  data() {
    return {
      inputVisible: false,
      inputValue: "",
      tagArr: []
    };
  },

  computed: {
    selfValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    isSplit() {
      return isEmpty(this.valueFormat);
    }
  },

  watch: {
    value(newV, oldV) {
      if (!isEmpty(newV)) {
        this.selfValue = newV;

        if (this.isSplit) {
          this.tagArr = newV;
        } else {
          const temp = newV.split(",");
          this.tagArr = temp;
        }
      } else {
        this.tagArr = [];
      }
    }
  },

  props: {
    // origin
    value: [Array, String],
    hit: Boolean,
    size: String,
    type: String,
    effect: String,
    color: String,
    closable: Boolean,

    // custom
    valueFormat: String,
    inputWidth: { type: String, default: "150px" },
    addable: Boolean,
    draggable: Boolean
  },

  methods: {
    feedBack() {
      if (isEmpty(this.selfValue)) {
        return;
      }

      if (this.isSplit) {
        this.selfValue.map(i => {
          this.tagArr.push(i);
        });
      } else {
        this.tagArr = this.selfValue.split(this.valueFormat);
      }
    },

    onClick() {
      this.$emit("click");
    },

    onClose(tag) {
      if (this.isSplit) {
        this.selfValue.splice(this.selfValue.indexOf(tag), 1);
        // this.tagArr.splice(this.tagArr.indexOf(tag), 1);
      } else {
        this.tagArr.splice(this.tagArr.indexOf(tag), 1);
        const temp = this.selfValue.split(this.valueFormat);
        temp.splice(temp.indexOf(tag), 1);
        this.selfValue = temp.join(this.valueFormat);
      }
    },

    onShowInput() {
      this.inputVisible = true;
      // eslint-disable-next-line
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.wInput.$refs.input.focus();
      });
    },

    onInputConfirm() {
      let inputValue = this.inputValue;

      if (this.selfValue && this.selfValue.includes(inputValue)) {
        this.$message.info("请不要添加重复信息");
        return;
      }

      if (inputValue) {
        inputValue = String(inputValue);
        this.tagArr.push(inputValue);

        if (this.isSplit) {
          if (!this.selfValue.includes(inputValue)) {
            this.selfValue.push(inputValue);
          }
        } else {
          if (isEmpty(this.selfValue)) {
            this.selfValue = inputValue;
          } else {
            this.selfValue += this.valueFormat + inputValue;
          }
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    onSetSort() {
      const el = this.$refs.wTag;

      Sortable.create(el, {
        ghostClass: "sortable-ghost", // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData("Text", "");
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          if (this.isSplit) {
            const targetRow = this.selfValue.splice(evt.oldIndex, 1)[0];
            this.selfValue.splice(evt.newIndex, 0, targetRow);
            this.$emit("input", this.selfValue);
          } else {
            const temp = this.selfValue.split(this.valueFormat);
            const targetRow = temp.splice(evt.oldIndex, 1)[0];
            temp.splice(evt.newIndex, 0, targetRow);
            const newValue = temp.join(this.valueFormat);
            this.$emit("input", newValue);
          }
        }
      });
    }
  },

  created() {},

  mounted() {
    this.feedBack();
    if (this.draggable) {
      this.onSetSort();
    }
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
.wTag {
  ::v-deep {
    .sortable-ghost {
      opacity: 0.8;
      color: #fff !important;
      background: #42b983 !important;
    }

    .el-tag {
      cursor: pointer;
    }
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  margin-left: 10px;
  vertical-align: bottom;
}
</style>