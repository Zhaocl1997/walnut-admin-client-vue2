<template>
  <div style="position:absolute">
    <!-- <div style="background:white;">
      <w-icon icon="drag-horizontal" customClass="setting-drag" v-if="showDraggable"></w-icon>
    </div>-->

    <div class="draggable-container">
      <div class="draggable-icon-container">
        <w-icon icon="drag-horizontal" customClass="draggable-icon" v-if="showDraggable"></w-icon>
      </div>

      <div class="app-settings" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        <w-icon icon="setting" @click="onOpenPanel"></w-icon>
      </div>
    </div>

    <el-drawer
      append-to-body
      :title="title"
      :visible.sync="drawerVisible"
      :direction="direction"
      :show-close="showClose"
      :withHeader="withHeader"
      size="20%"
    >
      <w-settings-content></w-settings-content>
    </el-drawer>
  </div>
</template>

<script>
import wSettingsContent from "./content";
import wDraggable from "../Draggable";
import { debounce } from "@/utils";

export default {
  name: "wSettings",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: { wDraggable, wSettingsContent },

  mixins: [],

  data() {
    return {
      drawerVisible: false,
      showDraggable: false
    };
  },

  computed: {},

  watch: {},

  props: {
    title: String,
    direction: String,
    showClose: Boolean,
    withHeader: Boolean
  },

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
        //获取x坐标和y坐标
        x = e.clientX;
        y = e.clientY;

        //获取左部和顶部的偏移量
        l = el.offsetLeft;
        t = el.offsetTop;
        //开关打开
        isDown = true;
        //设置样式
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

    this.onMouseLeave = debounce(this.onMouseLeave);
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
.app-settings {
  height: 40px;
  width: 40px;
  background-color: orangered;
  border-radius: 10px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);

  // position: fixed;
  // top: 40%;
  // right: 2%;
  font-size: 36px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
}
.setting-drag {
  position: fixed;
  top: 35%;
  right: 2%;
  font-size: 18px;
  cursor: move;
}

.draggable-container {
  position: absolute;

  .draggable-icon-container {
    position: relative;
    top: 0;
    left: 0;
    cursor: move;

    .draggable-icon {
      font-size: 18px;
    }
  }
}
</style>