<template>
  <el-select
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
  >
    <el-option :value="mineStatusValue" style="height:200px;overflow-y:scroll;">
      <el-tree
        ref="tree"
        node-key="id"
        :data="data"
        :props="treeProps"
        :show-checkbox="multiple"
        :accordion="selfAccordion"
        highlight-current
        @check-change="onCheckChange"
        @node-click="onNodeClick"
      ></el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "UISelectTree",
  data() {
    return {
      mineStatus: "",
      mineStatusValue: []
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
    value(newV) {
      if (newV) {
        if (this.multiple && this.data.length !== 0) {
          this.$refs.tree.setCheckedKeys(newV);
        } else {
          this.mineStatusValue = newV;
        }
      }
    }
  },
  computed: {
    selfAccordion() {
      return !this.multiple;
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.multiple && this.data.length !== 0) {
        this.$refs.tree.setCheckedKeys(this.value);
      } else {
        this.mineStatusValue = this.value;
        console.log(this.mineStatusValue);
      }
    }, 2000);
  },
  methods: {
    // select框值改变时候触发的事件
    onSelectChange(v) {
      let arr = [];

      for (let i = 0; i < this.mineStatusValue.length; i++) {
        for (let j = 0; j < v.length; j++) {
          if (v[j] === this.mineStatusValue[i].label) {
            arr.push(this.mineStatusValue[i]);
          }
        }
      }

      this.$refs.tree.setCheckedNodes(arr);

      let newV = [];
      arr.map(i => newV.push(i.id));
      this.$emit("input", newV);
    },

    // 多选: check变化
    onCheckChange() {
      // 这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
      let res = this.$refs.tree.getCheckedNodes(true, true);

      let arrLabel = [];
      let arr = [];
      res.forEach(item => {
        arrLabel.push(item.label);
        arr.push(item);
      });

      this.mineStatusValue = arr;
      this.mineStatus = arrLabel;

      let newV = [];
      arr.map(i => newV.push(i.id));
      this.$emit("input", newV);
    },

    // 单选：节点被点击事件
    onNodeClick(data, node, arr) {
      if (this.multiple) {
        return;
      }

      this.mineStatusValue = data.id;
      this.mineStatus = data.label;
      this.$emit("input", data.id);
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
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}

.el-select-dropdown__item::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #fff;
}
</style>