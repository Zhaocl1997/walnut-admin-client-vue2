<template>
  <el-select
    ref="treeSelect"
    v-model="mineStatus"
    :size="size"
    :style="`width: ${width}`"
    :multiple="multiple"
    :disabled="disabled"
    :clearable="clearable"
    :collapse-tags="collapse"
    :placeholder="placeholder"
    @change="onSelectChange"
    @clear="onClear"
    @remove-tag="onRemoveTag"
  >
    <el-option :value="mineStatusValue" style="height:200px;overflow-y:auto;">
      <w-tree
        ref="wTree"
        v-model="selfValue"
        :data="data"
        :multiple="multiple"
        @node-click="onNodeClick"
        @check-change="onCheckChange"
        :node-key="treeProps.id"
        :props="props"
      ></w-tree>
    </el-option>
  </el-select>
</template>

<script>
import wTree from "../Tree";
import { findNodeById } from "@/utils/tree";
import ValueMixins from "@/mixins/Value";

export default {
  name: "UISelectTree",

  components: { wTree },

  mixins: [ValueMixins],

  data() {
    return {
      mineStatus: "",
      mineStatusValue: [],

      defaultCheckedKeys: []
    };
  },
  props: {
    value: [String, Number, Array],

    size: String,
    width: { type: String, default: "100%" },
    multiple: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    collapse: Boolean,
    accordion: Boolean,
    placeholder: { type: String, default: "请选择" },

    data: Array,
    treeProps: {
      type: Object,
      default: () => {
        return {
          id: "id",
          label: "label",
          children: "children"
        };
      }
    }
  },
  watch: {
    value() {
      this.feedback();
    }
  },
  computed: {
    selfAccordion() {
      return !this.multiple;
    },
    props() {
      return {
        id: this.treeProps.id,
        children: this.treeProps.children,
        label: this.treeProps.label
      };
    }
  },
  mounted() {
    this.feedback();
  },
  methods: {
    feedback() {
      if (this.data.length == 0) {
        return;
      }

      if (!this.value) {
        this.mineStatus = "";
        this.mineStatusValue = [];
      }

      if (this.multiple) {
        const arrLabel = [];
        const arrNode = [];

        this.value.map(i => {
          const node = findNodeById(
            i,
            this.data,
            this.treeProps.id,
            this.props,
            true
          );

          arrNode.push(node);
          arrLabel.push(node[this.props.label]);
        });

        this.mineStatus = arrLabel;
        this.mineStatusValue = arrNode;
      } else {
        const arrLabel = findNodeById(
          this.value,
          this.data,
          this.treeProps.id,
          this.props,
          true
        )[this.props.label];

        this.mineStatus = arrLabel;

        this.mineStatusValue = [this.value];
      }
    },

    onInput(v) {
      this.$emit("input", v);
    },

    onRemoveTag(v) {
      console.log(v);
    },

    // select框值改变时候触发的事件
    onSelectChange(v) {
      let arr = [];

      for (let i = 0; i < this.mineStatusValue.length; i++) {
        for (let j = 0; j < v.length; j++) {
          if (v[j] === this.mineStatusValue[i][this.props.label]) {
            arr.push(this.mineStatusValue[i]);
          }
        }
      }

      let newV = [];
      arr.map(i => newV.push(i[this.props.id]));
      this.$emit("input", newV);
    },

    // 多选: check变化
    onCheckChange() {
      // 这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
      let res = this.$refs.wTree.$children[0].getCheckedNodes(true, false);

      let arrLabel = [];
      let arr = [];
      res.forEach(item => {
        arrLabel.push(item[this.props.label]);
        arr.push(item);
      });

      this.mineStatusValue = arr;
      this.mineStatus = arrLabel;

      let newV = [];
      arr.map(i => newV.push(i[this.props.id]));
      this.$emit("input", newV);
    },

    // 单选：节点被点击事件
    onNodeClick(data, node, arr) {
      if (this.multiple) {
        return;
      }

      this.mineStatusValue = data[this.props.id];
      this.mineStatus = data[this.props.label];
      this.$emit("input", data[this.props.id]);

      this.$refs.treeSelect.blur();
    },

    // 单选：清空
    onClear() {
      this.$emit("input", "");
    }
  }
};
</script>

<style scoped>
.el-select-dropdown__item::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.el-select-dropdown__item::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}

.el-select-dropdown__item::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #fff;
}
</style>