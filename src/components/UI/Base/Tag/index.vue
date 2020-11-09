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
        size="mini"
        v-if="inputVisible"
        v-model="inputValue"
        :width="inputWidth"
        @keyup="onInputConfirm"
        @blur="onInputConfirm"
      ></w-input>

      <w-button
        v-else
        size="mini"
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
import { isEmpty } from "easy-fns/lib/utils";

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

    isFormattable() {
      return !isEmpty(this.valueFormat);
    }
  },

  watch: {
    value(newV, oldV) {
      if (isEmpty(newV)) {
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
    init() {
      this.feedBack();
      if (this.draggable) {
        this.onSetSort();
      }
    },

    feedBack() {
      if (isEmpty(this.selfValue)) {
        return;
      }

      if (this.isFormattable) {
        this.tagArr = this.selfValue.split(this.valueFormat);
      } else {
        this.selfValue.map(i => {
          this.tagArr.push(i);
        });
      }
    },

    onClick() {
      this.$emit("click");
    },

    onClose(tag) {
      if (this.isFormattable) {
        this.tagArr.splice(this.tagArr.indexOf(tag), 1);
        const temp = this.selfValue.split(this.valueFormat);
        temp.splice(temp.indexOf(tag), 1);
        this.selfValue = temp.join(this.valueFormat);
      } else {
        this.selfValue.splice(this.selfValue.indexOf(tag), 1);
        const index = this.tagArr.findIndex(i => i === tag);
        this.tagArr.splice(index, 1);
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

      if (!inputValue) {
        return;
      }

      if (this.tagArr.includes(inputValue)) {
        this.$message.info("请不要添加重复信息");
        return;
      }

      inputValue = String(inputValue);
      this.tagArr.push(inputValue);

      if (this.isFormattable) {
        if (isEmpty(this.selfValue)) {
          this.selfValue = inputValue;
        } else {
          this.selfValue += this.valueFormat + inputValue;
        }
      } else {
        if (isEmpty(this.selfValue)) {
          this.selfValue = [inputValue];
        } else {
          this.selfValue.push(inputValue);
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
          if (this.isFormattable) {
            const temp = this.selfValue.split(this.valueFormat);
            const targetRow = temp.splice(evt.oldIndex, 1)[0];
            temp.splice(evt.newIndex, 0, targetRow);
            const newValue = temp.join(this.valueFormat);
            this.$emit("input", newValue);
          } else {
            const targetRow = this.selfValue.splice(evt.oldIndex, 1)[0];
            this.selfValue.splice(evt.newIndex, 0, targetRow);
            this.$emit("input", this.selfValue);
          }
        }
      });
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
.wTag {
  .el-tag + .el-tag {
    cursor: pointer;
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
    margin-top: 5px;
    vertical-align: bottom;
  }
}
</style>