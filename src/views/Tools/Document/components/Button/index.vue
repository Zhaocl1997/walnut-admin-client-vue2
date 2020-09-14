<template>
  <div>
    <p>w-button 当前绑定值：{{ buttonInfo }}</p>

    <div class="mb8">
      <w-button @click="onClick" delay="10" block>延迟按钮</w-button>
      <w-button @click="onClick" loading="10">加载按钮</w-button>
      <w-button @click="onClick" tooltip>轻提示按钮</w-button>
      <w-button @click="onClick" popover>弹出框按钮</w-button>
      <w-button
        @popoverConfirm="onPrint"
        pop-confirm
        popover-title="打印"
        popover-content="确认要打印当前页面吗?"
      >确认框按钮</w-button>
    </div>

    <div class="mb8">
      <w-button @click="onClick" disabled>默认按钮</w-button>
      <w-button @click="onClick" type="primary">主要按钮</w-button>
      <w-button @click="onClick" type="success">成功按钮</w-button>
      <w-button @click="onClick" type="info">信息按钮</w-button>
      <w-button @click="onClick" type="warning">警告按钮</w-button>
      <w-button @click="onClick" type="danger">危险按钮</w-button>
    </div>

    <div class="mb8">
      <w-button @click="onClick" plain disabled>朴素按钮</w-button>
      <w-button @click="onClick" type="primary" plain>主要按钮</w-button>
      <w-button @click="onClick" type="success" plain>成功按钮</w-button>
      <w-button @click="onClick" type="info" plain>信息按钮</w-button>
      <w-button @click="onClick" type="warning" plain>警告按钮</w-button>
      <w-button @click="onClick" type="danger" plain>危险按钮</w-button>
    </div>

    <div class="mb8">
      <w-button @click="onClick" round disabled>圆角按钮</w-button>
      <w-button @click="onClick" type="primary" round>主要按钮</w-button>
      <w-button @click="onClick" type="success" round>成功按钮</w-button>
      <w-button @click="onClick" type="info" round>信息按钮</w-button>
      <w-button @click="onClick" type="warning" round>警告按钮</w-button>
      <w-button @click="onClick" type="danger" round>危险按钮</w-button>
    </div>

    <div class="mb8">
      <w-button @click="onClick" icon="el-icon-search" circle></w-button>
      <w-button @click="onClick" type="primary" icon="el-icon-edit" circle></w-button>
      <w-button @click="onClick" type="success" icon="el-icon-check" circle></w-button>
      <w-button @click="onClick" type="info" icon="el-icon-message" circle></w-button>
      <w-button @click="onClick" type="warning" icon="el-icon-star-off" circle></w-button>
      <w-button @click="onClick" type="danger" icon="el-icon-delete" circle></w-button>
    </div>

    <div class="mb8">
      <w-button @click="onClick" type="text">文字按钮</w-button>
      <w-button @click="onClick" type="text" disabled>文字按钮</w-button>
    </div>
  </div>
</template>

<script>
import wButton from "@/components/UI/Button";

export default {
  name: "",

  components: { wButton },

  data() {
    return { buttonInfo: 0 };
  },

  computed: {},

  watch: {},

  props: {},

  methods: {
    onClick() {
      this.buttonInfo += 1;
    },
    onPrint() {
      this.$print({ html: document.body.innerHTML });
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