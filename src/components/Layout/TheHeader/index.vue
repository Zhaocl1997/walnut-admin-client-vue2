<template>
  <div id="header-container">
    <div class="header_left-container">
      <el-row :gutter="10" type="flex" justify="start">
        <el-col :span="1.5">
          <div class="header_left-item_con">
            <TheLogo :collapse="isCollapse" />
          </div>
        </el-col>

        <el-col :span="1.5">
          <div class="header_left-item_con">
            <w-hamburger
              class="header-left-item_ham"
              :is-active="isCollapse"
              @toggleClick="onToggleSideBar"
            ></w-hamburger>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="header_right-container">
      <el-row :gutter="10" type="flex" justify="end">
        <el-col :span="1.5">
          <div class="header_right-item_con">
            <w-size-select class="header-right-item"></w-size-select>
          </div>
        </el-col>

        <el-col :span="1.5">
          <div class="header_right-item_con">
            <w-lock class="header-right-item"></w-lock>
          </div>
        </el-col>

        <el-col :span="1.5">
          <div class="header_right-item_con">
            <w-screen-full class="header-right-item"></w-screen-full>
          </div>
        </el-col>

        <el-col :span="1.5">
          <div class="header_right-item_con">
            <w-github class="header-right-item"></w-github>
          </div>
        </el-col>

        <el-col :span="1.5">
          <div class="header_right-item_con">
            <w-theme-picker class="header-right-item"></w-theme-picker>
          </div>
        </el-col>

        <el-col :span="1.5">
          <div class="header_right-item_con">
            <w-avatar
              class="header-right-item"
              url="https://iot-avatar.oss-cn-hangzhou.aliyuncs.com/Avaritia.jpg"
            ></w-avatar>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import TheLogo from "../TheLogo";
import wHamburger from "@/components/UI/Others/Hamburger";

import wSizeSelect from "@/components/UI/Others/SizeSelect";
import wScreenFull from "@/components/UI/Others/Screenfull";
import wGithub from "@/components/UI/Others/Github";
import wThemePicker from "@/components/UI/Others/ThemePicker";
import wAvatar from "@/components/UI/Others/Avatar";
import wLock from "@/components/UI/Others/Lock";

export default {
  name: "TheHeader",

  components: {
    TheLogo,
    wHamburger,

    wSizeSelect,
    wScreenFull,
    wGithub,
    wThemePicker,
    wAvatar,
    wLock
  },

  mixins: [],

  data() {
    return {};
  },

  computed: {
    isCollapse() {
      return this.$store.state.settings.sidebarCollapsed;
    }
  },

  watch: {},

  props: {},

  methods: {
    onToggleSideBar() {
      this.$store.dispatch("settings/changeSettings", {
        key: "sidebarCollapsed",
        value: !this.isCollapse
      });
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