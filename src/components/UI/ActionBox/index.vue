<template>
  <el-row :gutter="10">
    <el-col :span="1.5">
      <w-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        @click="onCreate"
        v-if="isShow('create')"
      >新增</w-button>
    </el-col>

    <el-col :span="1.5">
      <w-button
        type="success"
        icon="el-icon-edit"
        :disabled="this.number !== 1"
        size="small"
        @click="onUpdate"
        v-if="isShow('update')"
      >修改</w-button>
    </el-col>

    <el-col :span="1.5">
      <w-button
        type="danger"
        icon="el-icon-delete"
        :disabled="this.number === 0"
        size="small"
        v-if="isShow('delete')"
        @popoverConfirm="onDelete"
        pop-confirm
        popover-title="警告"
        popover-content="确认要删除选中数据吗?"
      >删除</w-button>
    </el-col>

    <el-col :span="1.5">
      <w-button
        type="info"
        icon="el-icon-upload"
        size="small"
        @click="onImport"
        v-if="isShow('import')"
      >导入</w-button>
    </el-col>

    <el-col :span="1.5">
      <w-button
        type="warning"
        icon="el-icon-download"
        size="small"
        @click="onExport"
        v-if="isShow('export')"
      >导出</w-button>
    </el-col>

    <!-- <template v-for="(item, index) in $slots.default">
      <el-col :key="index" :span="1.5">{{ $slots.default[index] }}</el-col>
    </template>-->
  </el-row>
</template>

<script>
import wButton from "@/components/UI/Button";

export default {
  name: "wActionBox",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: { wButton },

  mixins: [],

  data() {
    return {};
  },

  computed: {},

  watch: {},

  props: {
    // 判断哪些按钮显示
    commands: {
      type: Array,
      default: () => ["create", "update", "delete", "import", "export"]
    },

    // 多选状况下的逻辑判断
    number: {
      type: Number,
      default: 0
    }
  },

  methods: {
    isShow(v) {
      return this.commands.includes(v);
    },
    onCreate(e) {
      this.$emit("create", e);
    },
    onUpdate(e) {
      this.$emit("update", e);
    },
    onDelete(e) {
      this.$emit("delete", e);
    },
    onImport(e) {
      this.$emit("import", e);
    },
    onExport(e) {
      this.$emit("export", e);
    }
  },

  created() {},

  mounted() {},

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