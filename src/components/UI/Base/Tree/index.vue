<template>
  <el-tree
    ref="wTree"
    :data="data"
    :emptyText="emptyText"
    :renderAfterExpand="renderAfterExpand"
    :nodeKey="nodeKey"
    :checkStrictly="checkStrictly"
    :defaultExpandAll="defaultExpandAll"
    :expandOnClickNode="expandOnClickNode"
    :checkOnClickNode="checkOnClickNode"
    :checkDescendants="checkDescendants"
    :autoExpandParent="autoExpandParent"
    :defaultCheckedKeys="defaultCheckedKeys"
    :defaultExpandedKeys="defaultExpandedKeys"
    :currentNodeKey="currentNodeKey"
    :renderContent="renderContent"
    :showCheckbox="multiple"
    :draggable="draggable"
    :allowDrag="allowDrag"
    :allowDrop="allowDrop"
    :props="treeProps"
    :lazy="lazy"
    :highlightCurrent="highlightCurrent"
    :load="load"
    :filterNodeMethod="filterNodeMethod"
    :accordion="accordion"
    :indent="indent"
    :iconClass="iconClass"
    @node-click="onNodeClick"
    @check="onCheckChange"
  >
    <div v-if="$slots.treeNode">
      <template slot-scope="{node, data}">
        <slot name="treeNode" :node="node" :data="data" />
      </template>
    </div>
  </el-tree>
</template>

<script>
export default {
  name: "wTree",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: {},

  mixins: [],

  data() {
    return {
      defaultExpandedKeys: [],

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
    },

    nodeKey() {
      return this.treeProps.id;
    }
  },

  watch: {
    value() {
      this.feedBack();
    }
  },

  props: {
    // origin
    data: Array,

    emptyText: String,

    renderAfterExpand: { type: Boolean, default: true },

    // nodeKey: { type: String, default: "id" },

    checkStrictly: Boolean,

    defaultExpandAll: Boolean,

    expandOnClickNode: { type: Boolean, default: false },

    checkOnClickNode: Boolean,

    checkDescendants: {
      type: Boolean,
      default: false
    },

    autoExpandParent: {
      type: Boolean,
      default: true
    },

    defaultCheckedKeys: Array,

    // defaultExpandedKeys: Array,

    currentNodeKey: [String, Number],

    renderContent: Function,

    // showCheckbox: {
    //   type: Boolean,
    //   default: false
    // },

    draggable: {
      type: Boolean,
      default: false
    },

    allowDrag: Function,
    allowDrop: Function,

    props: Object,

    lazy: {
      type: Boolean,
      default: false
    },

    highlightCurrent: { type: Boolean, default: true },

    load: Function,

    filterNodeMethod: Function,

    accordion: Boolean,

    indent: {
      type: Number,
      default: 18
    },

    iconClass: String,

    // custom
    value: [String, Number, Array],
    multiple: Boolean,
    leafOnly: Boolean,
    includeHalfChecked: Boolean
  },

  methods: {
    arr_diffA(a, b) {
      return a.filter(x => !new Set(b).has(x));
    },

    // feedback
    feedBack() {
      if (!this.value) {
        if (this.multiple) {
          this.defaultExpandedKeys = [];

          this.$nextTick(() => {
            this.$refs.wTree.setCheckedKeys(this.value);
          });
        } else {
          this.$nextTick(() => {
            this.$refs.wTree.setCurrentKey(this.value);
          });
        }

        return;
      }

      if (this.multiple) {
        this.defaultExpandedKeys = this.value;

        const levelOneNodeIdArr = this.data.map(i => i[this.nodeKey]);
        const val = this.arr_diffA(this.value, levelOneNodeIdArr);

        this.$nextTick(() => {
          this.$refs.wTree.setCheckedKeys(val);
        });
      } else {
        this.defaultExpandedKeys = [this.value];

        this.$nextTick(() => {
          this.$refs.wTree.setCurrentKey(this.value);
        });
      }
    },

    // single
    onNodeClick(data, node, arr) {
      if (this.multiple) {
        return;
      }

      this.$emit("input", data[this.nodeKey]);
      this.$emit("node-click", data, node, arr);
    },

    // multiple
    onCheckChange(
      data,
      { checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys }
    ) {
      if (!this.multiple) {
        return;
      }

      // 1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false
      const res = this.$refs.wTree.getCheckedNodes(
        this.leafOnly,
        this.includeHalfChecked
      );

      let arr = [];
      res.map(i => {
        arr.push(i[this.nodeKey]);
      });

      this.$emit("input", arr);
      this.$emit("check", data, {
        checkedNodes,
        checkedKeys,
        halfCheckedNodes,
        halfCheckedKeys
      });
    },

    // expand
    expandAll(val) {
      let nodes = this.$refs.wTree.store.nodesMap;
      for (let i in nodes) {
        nodes[i].expanded = val;
      }
    },

    // check
    checkAll(val) {
      if (val) {
        this.$refs.wTree.setCheckedNodes(this.data);
      } else {
        this.$refs.wTree.setCheckedKeys([]);
      }
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
</style>