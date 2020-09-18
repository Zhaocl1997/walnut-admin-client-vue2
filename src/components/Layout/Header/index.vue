<template>
  <div id="header-container">
    <div class="header-left"></div>
    <div class="header-right">
      <w-size-select class="header-right-item"></w-size-select>
      <w-theme-picker class="header-right-item"></w-theme-picker>
      <w-screen-full class="header-right-item"></w-screen-full>
      <w-github class="header-right-item"></w-github>
      <w-avatar
        class="header-right-item"
        url="https://iot-avatar.oss-cn-hangzhou.aliyuncs.com/Avaritia.jpg"
      ></w-avatar>
      <w-right-panel class="header-right-item"></w-right-panel>
      <w-lock class="header-right-item"></w-lock>
    </div>
  </div>
</template>

<script>
import wSizeSelect from "@/components/UI/SizeSelect";
import wScreenFull from "@/components/UI/Screenfull";
import wGithub from "@/components/UI/Github";
import wThemePicker from "@/components/UI/ThemePicker";
import wAvatar from "@/components/UI/Avatar";
import wRightPanel from "@/components/UI/RightPanel";
import wLock from "@/components/UI/Lock";

export default {
  name: "wHeader",

  components: {
    wSizeSelect,
    wScreenFull,
    wGithub,
    wThemePicker,
    wAvatar,
    wRightPanel,
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