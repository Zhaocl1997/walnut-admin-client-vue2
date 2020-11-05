<template>
  <div>
    <el-tabs v-model="activeName" tab-position="left">
      <el-tab-pane label="wForm" name="wForm">
        <form-area></form-area>
      </el-tab-pane>

      <el-tab-pane label="wButton" name="wButton">
        <button-area></button-area>
      </el-tab-pane>

      <el-tab-pane label="wInput" name="wInput">
        <input-area></input-area>
      </el-tab-pane>

      <el-tab-pane label="wSelect" name="wSelect">
        <select-area></select-area>
      </el-tab-pane>

      <el-tab-pane label="wDate" name="wDate">
        <date-area></date-area>
      </el-tab-pane>

      <el-tab-pane label="wTime" name="wTime">
        <time-area></time-area>
      </el-tab-pane>

      <el-tab-pane label="wTag" name="wTag">
        <tag-area></tag-area>
      </el-tab-pane>

      <el-tab-pane label="wSwitch" name="wSwitch">
        <switch-area></switch-area>
      </el-tab-pane>

      <el-tab-pane label="wTree" name="wTree">
        <tree-area></tree-area>
      </el-tab-pane>

      <el-tab-pane label="wSelectTree" name="wSelectTree">
        <select-tree-area></select-tree-area>
      </el-tab-pane>

      <el-tab-pane label="wCheckbox" name="wCheckbox">
        <checkbox-area></checkbox-area>
      </el-tab-pane>

      <el-tab-pane label="wEditor" name="wEditor">
        <editor-area></editor-area>
      </el-tab-pane>

      <el-tab-pane label="wDialog" name="wDialog">
        <dialog-area></dialog-area>
      </el-tab-pane>

      <el-tab-pane label="wSelectIcon" name="wSelectIcon">
        <select-icon-area></select-icon-area>
      </el-tab-pane>

      <el-tab-pane label="wItem" name="wItem">
        <w-size-select></w-size-select>
        <w-theme-picker></w-theme-picker>
        <w-screen-full></w-screen-full>
        <w-github></w-github>
        <w-avatar url="https://iot-avatar.oss-cn-hangzhou.aliyuncs.com/Avaritia.jpg"></w-avatar>
        <w-lock></w-lock>
      </el-tab-pane>

      <el-tab-pane label="wTable" name="wTable">
        <table-area></table-area>
      </el-tab-pane>

      <el-tab-pane label="wRadio" name="wRadio">
        <radio-area></radio-area>
      </el-tab-pane>

      <el-tab-pane label="wTest" name="wTest">
        <h1 v-for="i in 100" :key="i">标题{{ i }}</h1>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ButtonArea from "./components/Button";
import InputArea from "./components/Input";
import DateArea from "./components/Date";
import CheckboxArea from "./components/Checkbox";
import TimeArea from "./components/Time";
import FormArea from "./components/Form";
import SelectArea from "./components/Select";
import EditorArea from "./components/Editor";
import DialogArea from "./components/Dialog";
import SwitchArea from "./components/Switch";
import TagArea from "./components/Tag";
import TreeArea from "./components/Tree";
import SelectTreeArea from "./components/SelectTree";
import SelectIconArea from "./components/SelectIcon";
import TableArea from "./components/Table";
import RadioArea from "./components/Radio";

import wSizeSelect from "@/components/UI/Others/SizeSelect";
import wScreenFull from "@/components/UI/Others/Screenfull";
import wGithub from "@/components/UI/Others/Github";
import wThemePicker from "@/components/UI/Others/ThemePicker";
import wAvatar from "@/components/UI/Others/Avatar";
import wLock from "@/components/UI/Others/Lock";

export default {
  name: "wDocument",

  components: {
    ButtonArea,
    InputArea,
    DateArea,
    CheckboxArea,
    TimeArea,
    FormArea,
    SelectArea,
    EditorArea,
    DialogArea,
    SwitchArea,
    TagArea,
    TreeArea,
    SelectTreeArea,
    SelectIconArea,
    TableArea,
    RadioArea,

    wSizeSelect,
    wScreenFull,
    wGithub,
    wThemePicker,
    wAvatar,
    wLock
  },

  mixins: [],

  data() {
    return {
      activeName: "wForm"
    };
  },

  computed: {},

  watch: {},

  props: {},

  methods: {},

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