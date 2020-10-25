<template>
  <el-select
    ref="treeSelect"
    v-model="selectValue"
    :size="size"
    :style="style"
    :multiple="multiple"
    :disabled="disabled"
    :clearable="clearable"
    :placeholder="placeholder"
    :collapse-tags="collapse"
    @change="onSelectChange"
    @clear="onClear"
  >
    <el-option :value="optionValue" style="height:200px;overflow-y:auto;">
      <w-tree
        ref="wTree"
        v-model="selfValue"
        :data="data"
        :props="treeProps"
        :multiple="multiple"
        :accordion="accordion"
        @node-click="onNodeClick"
        @check="onCheckChange"
      ></w-tree>
    </el-option>
  </el-select>
</template>

<script>
import ValueMixins from "@/mixins/Value";
import BlockMixins from "@/mixins/Block";

import wTree from "../Tree";

import { findNodeById } from "@/utils/tree";

export default {
  name: "wSelectTree",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: { wTree },

  mixins: [ValueMixins, BlockMixins()],

  data() {
    return {
      selectValue: "",
      optionValue: [],

      defaultProps: {
        id: "id",
        label: "label",
        children: "children",
        disabled: "disabled"
      }
    };
  },

  computed: {
    treeProps() {
      return {
        ...this.defaultProps,
        ...this.props
      };
    }
  },

  watch: {
    value() {
      this.feedback();
    }
  },

  props: {
    // origin
    data: Array,
    size: String,
    multiple: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    collapse: Boolean,
    accordion: Boolean,
    placeholder: String,

    // custom
    value: [String, Number, Array],
    props: Object
  },

  methods: {
    // feedback
    feedback() {
      if (this.data.length == 0) {
        return;
      }

      if (!this.value) {
        this.selectValue = "";
        this.optionValue = [];
      }

      if (this.multiple) {
        const arrLabel = [];
        const arrNode = [];

        this.value.map(i => {
          const node = findNodeById(
            i,
            this.data,
            this.treeProps.id,
            this.treeProps,
            true
          );

          arrNode.push(node);
          arrLabel.push(node[this.treeProps.label]);
        });

        this.selectValue = arrLabel;
        this.optionValue = arrNode;
      } else {
        const arrLabel = findNodeById(
          this.value,
          this.data,
          this.treeProps.id,
          this.treeProps,
          true
        )[this.treeProps.label];

        this.selectValue = arrLabel;

        this.optionValue = [this.value];
      }
    },

    // select change
    onSelectChange(v) {
      let arr = [];

      for (let i = 0; i < this.optionValue.length; i++) {
        for (let j = 0; j < v.length; j++) {
          if (v[j] === this.optionValue[i][this.treeProps.label]) {
            arr.push(this.optionValue[i]);
          }
        }
      }

      let newV = [];
      arr.map(i => newV.push(i[this.treeProps.id]));
      this.$emit("input", newV);
    },

    // multiple
    onCheckChange() {
      let res = this.$refs.wTree.$children[0].getCheckedNodes(true, false);

      let arrLabel = [];
      let arr = [];
      res.forEach(item => {
        arrLabel.push(item[this.treeProps.label]);
        arr.push(item);
      });

      this.optionValue = arr;
      this.selectValue = arrLabel;

      let newV = [];
      arr.map(i => newV.push(i[this.treeProps.id]));
      this.$emit("input", newV);
    },

    // single
    onNodeClick(data, node, arr) {
      if (this.multiple) {
        return;
      }

      this.optionValue = data[this.treeProps.id];
      this.selectValue = data[this.treeProps.label];
      this.$emit("input", data[this.treeProps.id]);

      this.$refs.treeSelect.blur();
    },

    // clear
    onClear() {
      this.$emit("input", "");
    }
  },

  created() {},

  mounted() {
    this.feedback();
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

<style scoped>
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #fff;
}
.el-select-dropdown__item::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.el-select-dropdown__item::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}

.el-select-dropdown__item::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
</style>