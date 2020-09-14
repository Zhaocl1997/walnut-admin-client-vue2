<template>
  <el-select
    v-model="selfLabel"
    :multiple="multiple"
    :disabled="disabled"
    :clearable="clearable"
    :collapse-tags="collapse"
    :placeholder="placeholder"
    @clear="onClear"
  >
    <el-option :value="selfValue" style="min-height:200px;overflow-y:scroll;">
      <w-tree
        v-model="selfValue"
        :data="data"
        :multiple="multiple"
        highlight-current
        @node-click="onNodeClick"
        @check-change="onCheckChange"
      ></w-tree>
    </el-option>
  </el-select>
</template>

<script>
import wTree from "../Tree";
import ValueMixins from "@/mixins/Value";

export default {
  name: "wSelectTree",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: { wTree },

  mixins: [ValueMixins],

  data() {
    return {
      selfLabel: "",

      mineStatus: "",
      mineStatusValue: []
    };
  },

  computed: {},

  watch: {
    // value(newV) {
    //   if (newV) {
    //     if (this.multiple && this.treeOptions.length !== 0) {
    //       this.$refs.tree.setCheckedKeys(newV);
    //     } else {
    //       this.mineStatusValue = newV;
    //     }
    //   }
    // },
    // selfValue(newV, oldV) {
    //   if (newV) {
    //     if (this.multiple && this.treeOptions.length !== 0) {
    //       this.$refs.tree.setCheckedKeys(newV);
    //     } else {
    //       this.mineStatusValue = newV;
    //     }
    //   }
    // }
  },

  props: {
    value: [String, Number, Array],

    multiple: Boolean,
    disabled: Boolean,
    clearable: { type: Boolean, default: true },
    collapse: Boolean,
    accordion: { type: Boolean, default: false },
    placeholder: { type: String, default: "请选择" },

    data: Array,
    props: Object
  },

  methods: {
    feedBack() {
      if (!this.multiple) {
        // console.log(123);
      } else {
        // console.log(this.selfLabel);
      }
    },

    // multiple
    onCheckChange(data, checked, indeterminate, res) {
      const arrLabel = [];

      res.forEach(item => {
        arrLabel.push(item.label);
      });

      this.selfLabel = arrLabel;
    },

    // single
    onNodeClick(data, node, arr) {
      this.selfLabel = data.label;
    },

    // clear
    onClear() {
      this.$emit("input", "");
    }
  },

  created() {},

  mounted() {
    this.feedBack();
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