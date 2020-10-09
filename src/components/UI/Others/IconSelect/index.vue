<template>
  <div>
    <w-input v-model="selfValue" @focus="onClick" readonly>
      <div slot="prepend" @click="onClick">
        <w-icon v-if="selfValue" :icon="selfValue" customClass="right-icon"></w-icon>
        <div v-else>+</div>
      </div>
    </w-input>

    <w-dialog
      :dialogDrag="['fullscreen']"
      :dialogVisible.sync="visible"
      dialogTitle="选择你的图标"
      :footer="false"
      top="2vh"
    >
      <w-input
        v-model="filters"
        size="small"
        placeholder="请输入图标名称"
        @input="onFilter"
        clearable
        @clear="onClear"
        width="200px"
      ></w-input>

      <br />

      <el-tabs class="u-mt10" v-model="activeName" tab-position="left" @tab-click="onTabClick">
        <el-tab-pane :label="key" :name="key" v-for="(val, key) in icons" :key="key">
          <div class="w-icon_main-con">
            <template v-for="item in val">
              <div class="icon-container" :key="item">
                <w-icon :icon="item" class="icon-self" @click="onChoose(item)"></w-icon>
                <p class="icon-name" :title="item" @click="onChoose(item)">{{ item }}</p>
              </div>
            </template>
          </div>
        </el-tab-pane>
      </el-tabs>
    </w-dialog>
  </div>
</template>

<script>
import wDialog from "../../Base/Dialog";
import wInput from "../../Base/Input";
import { icons } from "./icons";
import BlockMixins from "@/mixins/Block";
import ValueMixins from "@/mixins/Value";
import { deepClone } from "@/utils";

export default {
  name: "wIconSelect",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: { wInput, wDialog },

  mixins: [BlockMixins(), ValueMixins],

  data() {
    return {
      icons: icons,
      origin: deepClone(icons),
      visible: false,
      filters: "",
      activeName: "mixeds"
    };
  },

  computed: {},

  watch: {},

  props: {
    value: String
  },

  methods: {
    onClick() {
      this.visible = true;
    },

    onChoose(item) {
      this.selfValue = item;
      this.visible = false;
    },

    onFilter() {
      this.icons[this.activeName] = this.origin[this.activeName].filter(item =>
        item.includes(this.filters)
      );
    },

    onClear() {
      this.filters = "";
      this.icons[this.activeName] = this.origin[this.activeName];
    },

    onTabClick() {
      this.icons[this.activeName] = this.origin[this.activeName].filter(item =>
        item.includes(this.filters)
      );
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
.w-icon_main-con {
  height: 65vh;
  overflow-y: scroll;
}
.w-icon_main-con::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.w-icon_main-con::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}

.w-icon_main-con::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

.icon-container {
  text-align: center;
  padding: 5px;
  width: 80px;
  line-height: 50px;
  transition: all 0.2s;
  display: inline-block;
  cursor: pointer;
}
.icon-container:hover {
  color: orangered;
  transform: scale(1.2);
}
.icon-self {
  cursor: pointer;
  font-size: 32px;
}
.icon-name {
  line-height: 16px;
  font-size: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: -10px;
}
</style>