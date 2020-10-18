<template>
  <el-tree
    ref="tree"
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
    :showCheckbox="showCheckbox || multiple"
    :draggable="draggable"
    :allowDrag="allowDrag"
    :allowDrop="allowDrop"
    :props="props"
    :lazy="lazy"
    :highlightCurrent="highlightCurrent"
    :load="load"
    :filterNodeMethod="filterNodeMethod"
    :accordion="accordion"
    :indent="indent"
    :iconClass="iconClass"
    @node-click="onNodeClick"
    @check-change="onCheckChange"
  ></el-tree>
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
      defaultExpandedKeys: []
    };
  },

  computed: {},

  watch: {
    // value(newV, oldV) {
    //   if (newV && oldV && newV !== oldV) {
    //     this.feedBack();
    //   }
    // }
  },

  props: {
    // origin
    data: Array,
    emptyText: String,

    renderAfterExpand: { type: Boolean, default: true },
    nodeKey: { type: String, default: "id" },
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
    showCheckbox: {
      type: Boolean,
      default: false
    },

    draggable: {
      type: Boolean,
      default: false
    },

    allowDrag: Function,
    allowDrop: Function,
    props: {
      type: Object,
      default: function() {
        return {
          children: "children",
          label: "label",
          disabled: "disabled"
        };
      }
    },
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
    multiple: Boolean
  },

  methods: {
    feedBack() {
      if (!this.value) {
        return;
      }

      if (this.multiple) {
        this.defaultExpandedKeys = this.value;

        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.value);
        });
      } else {
        this.defaultExpandedKeys = [this.value];

        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(this.value);
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
    onCheckChange(data, checked, indeterminate) {
      if (!this.multiple) {
        return;
      }

      const res = this.$refs.tree.getCheckedNodes(true, true);

      let arr = [];
      res.map(i => {
        arr.push(i[this.nodeKey]);
      });
      this.$emit("input", arr);
      this.$emit("check-change", data, checked, indeterminate, res);
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