<template>
  <div>
    <div class="draggable-container" @mouseleave="onMouseLeave">
      <div class="draggable-icon-container">
        <w-icon icon="drag-horizontal" customClass="draggable-icon" v-if="showDraggable"></w-icon>
      </div>

      <div class="app-settings" @mouseenter="onMouseEnter">
        <w-icon icon="setting" @click="onOpenPanel"></w-icon>
      </div>
    </div>

    <w-drawer
      append-to-body
      :show-close="false"
      title="System Settings"
      :visible.sync="drawerVisible"
      size="20%"
    >
      <TheSettingsContent></TheSettingsContent>
    </w-drawer>
  </div>
</template>

<script>
import wDrawer from "../../Base/Drawer";
import TheSettingsContent from "./content";

export default {
  name: "TheSettings",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: { wDrawer, TheSettingsContent },

  mixins: [],

  data() {
    return {
      drawerVisible: false,
      showDraggable: false
    };
  },

  computed: {},

  watch: {},

  props: {},

  methods: {
    onOpenPanel() {
      this.drawerVisible = true;
    },

    onMouseEnter() {
      this.showDraggable = true;
    },

    onMouseLeave() {
      this.showDraggable = false;
    },

    init() {
      const el = document.querySelector(".draggable-container");

      let x = 0;
      let y = 0;
      let l = 0;
      let t = 0;
      let isDown = false;

      // 鼠标按下事件
      el.onmousedown = function(e) {
        // 获取x坐标和y坐标
        x = e.clientX;
        y = e.clientY;

        // 获取左部和顶部的偏移量
        l = el.offsetLeft;
        t = el.offsetTop;
        // 开关打开
        isDown = true;
        // 设置样式
        el.style.cursor = "move";
      };

      // 鼠标移动
      window.onmousemove = function(e) {
        if (isDown == false) {
          return;
        }
        // 获取x和y
        let nx = e.clientX;
        let ny = e.clientY;
        // 计算移动后的左偏移量和顶部的偏移量
        let nl = nx - (x - l);
        let nt = ny - (y - t);

        // 边界处理
        if (nt + 40 > window.innerHeight || nl + 40 > window.innerWidth) {
          return;
        }

        el.style.left = nl + "px";
        el.style.top = nt + "px";
      };

      // 鼠标抬起事件
      el.onmouseup = function() {
        // 开关关闭
        isDown = false;
        el.style.cursor = "default";
      };
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
@import "@/assets/styles/vendors/_element.scss";

.draggable-container {
  position: fixed;
  right: 5%;
  bottom: 10%;
  text-align: center;
  z-index: 999999;

  .draggable-icon-container {
    position: absolute;
    top: -25px;
    left: 0;
    cursor: move;
    z-index: 1111;
    line-height: 20px;
    font-size: 24px;
    width: 40px;
    color: #999;
    background-color: whitesmoke;
    transition: opacity 0.3s;
    box-shadow: 0 0 5px #ddd;
  }

  .app-settings {
    height: 40px;
    width: 40px;
    background-color: $--color-primary;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
    font-size: 36px;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>