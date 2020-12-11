<template>
  <el-card>
    <template #header>
      <span>基本</span>
    </template>

    <w-icon icon="home"></w-icon>

    <br />

    <w-icon icon="home" width="40"></w-icon>
    <w-icon icon="home" height="80"></w-icon>

    <br />

    <w-icon icon="home" horizontalFlip></w-icon>
    <w-icon icon="home" verticalFlip></w-icon>

    <br />

    <w-icon icon="home" rotate="1"></w-icon>
    <w-icon icon="home" rotate="2"></w-icon>
    <w-icon icon="home" rotate="3"></w-icon>

    <br />

    <w-icon icon="home" color="red"></w-icon>
    <w-icon icon="home" color="green"></w-icon>
    <w-icon icon="home" color="blue"></w-icon>

    <br />

    <w-icon icon="home" width="40" height="24" horizontalAlign="left" class="iconify"></w-icon>
    <w-icon icon="home" width="40" height="24" horizontalAlign="center" class="iconify"></w-icon>
    <w-icon icon="home" width="40" height="24" horizontalAlign="right" class="iconify"></w-icon>

    <br />

    <w-icon icon="home" width="24" height="40" align="left,slice" class="iconify"></w-icon>
    <w-icon icon="home" width="24" height="40" align="center,slice" class="iconify"></w-icon>
    <w-icon icon="home" width="24" height="40" align="right,slice" class="iconify"></w-icon>

    <br />

    <w-icon icon="home" width="24" height="40" verticalAlign="top" class="iconify"></w-icon>
    <w-icon icon="home" width="24" height="40" verticalAlign="middle" class="iconify"></w-icon>
    <w-icon icon="home" width="24" height="40" verticalAlign="bottom" class="iconify"></w-icon>

    <br />

    <w-icon icon="home" width="40" height="24" align="top,slice" class="iconify"></w-icon>
    <w-icon icon="home" width="40" height="24" align="middle,slice" class="iconify"></w-icon>
    <w-icon icon="home" width="40" height="24" align="bottom,slice" class="iconify"></w-icon>

    <br />

    <w-icon icon="home" width="40" height="24" align="left,top" class="iconify"></w-icon>
    <w-icon icon="home" width="40" height="24" align="left,top,slice" class="iconify"></w-icon>
  </el-card>

  <br />
</template>

<script lang='ts'>
import { ref, reactive, computed, defineComponent } from "vue";

export default defineComponent({
  name: "IconDemo",

  props: {},

  components: {},

  setup(props, { attrs }) {}
});
</script>

<style lang='scss' scoped>
.iconify {
  box-shadow: 0 0 0 1px #e88;
}
</style>