<template>
  <div id="header-container">
    <div class="header_left-container">
      <el-row :gutter="10" type="flex" justify="start">
        <el-col :span="8">
          <!-- <the-logo></the-logo> -->
        </el-col>
      </el-row>
    </div>

    <div class="header_right-container">
      <el-row :gutter="10" type="flex" justify="end">
        <el-col :span="1.5">
          <div class="header_right-item_con hover-effect">
            <w-size-select class="header-right-item"></w-size-select>
          </div>
        </el-col>

        <el-col :span="1.5">
          <div class="header_right-item_con hover-effect">
            <w-lock class="header-right-item hover-effect"></w-lock>
          </div>
        </el-col>

        <el-col :span="1.5">
          <div class="header_right-item_con hover-effect">
            <w-screen-full class="header-right-item hover-effect"></w-screen-full>
          </div>
        </el-col>

        <el-col :span="1.5">
          <div class="header_right-item_con hover-effect">
            <w-github class="header-right-item hover-effect"></w-github>
          </div>
        </el-col>

        <el-col :span="1.5">
          <div class="header_right-item_con hover-effect">
            <w-theme-picker class="header-right-item hover-effect"></w-theme-picker>
          </div>
        </el-col>

        <el-col :span="1.5">
          <div class="header_right-item_con hover-effect">
            <w-avatar
              class="header-right-item hover-effect"
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