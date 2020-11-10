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
        leaf-only
        v-model="treeValue"
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
import { findNodeById } from "easy-fns/lib/tree";
import { isEmpty } from "easy-fns/lib/utils";

import BlockMixins from "@/mixins/Block";
import wTree from "../Tree";

export default {
  name: "wSelectTree",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: { wTree },

  mixins: [BlockMixins()],

  data() {
    return {
      selectValue: "", // tag array
      optionValue: [], // node array, for select change use

      treeValue: undefined,

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
    value(newV) {
      this.feedback();
    }
  },

  props: {
    // origin
    data: Array,
    size: String,
    multiple: Boolean,
    disabled: Boolean,
    clearable: { type: Boolean, default: true },
    collapse: Boolean,
    accordion: { type: Boolean, default: true },
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
        return;
      }

      if (this.multiple) {
        const tagArray = [];
        const nodeArray = [];

        this.value.map(i => {
          const node = findNodeById(
            i,
            this.data,
            this.treeProps.id,
            this.treeProps,
            true
          );

          nodeArray.push(node);
          tagArray.push(node[this.treeProps.label]);
        });

        this.selectValue = tagArray;
        this.optionValue = nodeArray;
        this.treeValue = this.value;
      } else {
        const node = findNodeById(
          this.value,
          this.data,
          this.treeProps.id,
          this.treeProps,
          true
        );

        this.selectValue = node[this.treeProps.label];
        this.optionValue = [node];
        this.treeValue = this.value;
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

      this.treeValue = newV;

      this.$emit("input", newV);
    },

    // multiple
    onCheckChange() {
      if (!this.multiple) {
        return;
      }

      let res = this.$refs.wTree.$children[0].getCheckedNodes(true, false);

      let tagArray = [];
      res.forEach(item => {
        tagArray.push(item[this.treeProps.label]);
      });

      this.selectValue = tagArray;

      this.$emit("input", this.treeValue);
    },

    // single
    onNodeClick(data, node, arr) {
      if (this.multiple) {
        return;
      }

      this.selectValue = data[this.treeProps.label];

      this.$emit("input", this.treeValue);

      this.$refs.treeSelect.blur();
    },

    // clear
    onClear() {
      this.$refs.wTree.expandAll(false);
      this.$emit("input", "");
    }
  },

  created() {},

  mounted() {
    setTimeout(() => {
      this.feedback();
    }, 500);
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
  background: #535353;
}

.el-select-dropdown__item::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 10px;
  background: #ededed;
}
</style>