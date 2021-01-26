<template>
  <el-card>
    <template #header>
      <span>国际化</span>

      <el-form inline>
        <el-form-item label="显示文字">
          <el-switch v-model="showText"></el-switch>
        </el-form-item>
      </el-form>
    </template>

    <w-locale-picker :show-text="showText"></w-locale-picker>
  </el-card>

  <br />
  <el-card>
    <template #header>
      <span>标题</span>

      <el-form inline>
        <el-form-item label="显示左侧">
          <el-switch v-model="showLeft"></el-switch>
        </el-form-item>

        <el-form-item label="显示下划线">
          <el-switch v-model="showBottom"></el-switch>
        </el-form-item>

        <el-form-item label="显示帮助信息">
          <el-switch v-model="showHelp"></el-switch>
        </el-form-item>
      </el-form>
    </template>

    <w-title
      :show-left="showLeft"
      :show-bottom="showBottom"
      :content="showHelp ? '一些帮助信息' : ''"
      >一些标题</w-title
    >
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>箭头</span>

      <el-form inline>
        <el-form-item label="激活">
          <el-switch v-model="active"></el-switch>
        </el-form-item>

        <el-form-item label="箭头朝向左">
          <el-switch v-model="left" :disabled="right"></el-switch>
        </el-form-item>

        <el-form-item label="箭头朝向右">
          <el-switch v-model="right" :disabled="left"></el-switch>
        </el-form-item>
      </el-form>
    </template>

    <w-arrow :active="active" :left="left" :right="right"></w-arrow>
  </el-card>

  <br />

  <el-card class="custom-sf">
    <template #header>
      <span>全屏 / 指定元素全屏 / 指定元素窗口内全屏</span>
    </template>

    <w-screen-full />

    <w-screen-full target=".custom-sf" />
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>json展示</span>
    </template>

    <w-JSON :value="jsonData"></w-JSON>
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>flippercard</span>
    </template>

    <w-flipper
      class="Card"
      width="270px"
      height="300px"
      :flipped="isFlipped"
      @click="onFlipperClick"
    >
      <template #front>
        <div class="Card__face">
          <span class="Card__value Card__value--top">10</span>
          <span class="Card__center">♣</span>
          <span class="Card__value Card__value--bottom">10</span>
        </div>
      </template>

      <template #back>
        <figure class="Card__pattern"></figure>
      </template>
    </w-flipper>
  </el-card>
</template>

<script>
  import { ref, reactive, computed, defineComponent, toRefs } from 'vue'

  import wLocalePicker from '/@/components/Help/App/Locale/index.vue'
  import wArrow from '/@/components/Help/Arrow/index.vue'
  import wFlipper from '/@/components/Help/Flipper/index.vue'
  import wJSON from '/@/components/Help/JSON/index.vue'
  import wScreenFull from '/@/components/Help/Screenfull/index.vue'
  import wTitle from '/@/components/Help/Title/index.vue'

  import jsonData from './json'

  export default defineComponent({
    name: 'HelpDemo',

    components: { wLocalePicker, wArrow, wFlipper, wJSON, wScreenFull, wTitle },

    setup(props, { attrs }) {
      const state = reactive({
        showText: false,

        showLeft: false,
        showBottom: false,
        showHelp: false,

        active: false,
        left: false,
        right: false,

        isFlipped: false,
      })

      const onFlipperClick = () => {
        state.isFlipped = !state.isFlipped
      }

      return {
        ...toRefs(state),
        jsonData,
        onFlipperClick,
      }
    },
  })
</script>

<style lang="scss">
  .Card {
    &__face,
    &__pattern {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      box-shadow: 0 3px 15px rgba(#000, 0.45);
      cursor: pointer;
    }

    &__pattern {
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNjAiIGhlaWdodD0iMzAiPgo8ZGVmcz4KPHJlY3QgaWQ9InIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIxNSIgZmlsbD0iI2JiMDg1ZiIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZT0iIzdhMDU0ZCI+PC9yZWN0Pgo8ZyBpZD0icCI+Cjx1c2UgeGxpbms6aHJlZj0iI3IiPjwvdXNlPgo8dXNlIHk9IjE1IiB4bGluazpocmVmPSIjciI+PC91c2U+Cjx1c2UgeT0iMzAiIHhsaW5rOmhyZWY9IiNyIj48L3VzZT4KPHVzZSB5PSI0NSIgeGxpbms6aHJlZj0iI3IiPjwvdXNlPgo8L2c+CjwvZGVmcz4KPHVzZSB4bGluazpocmVmPSIjcCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtMjUpIHNrZXdZKDQwKSI+PC91c2U+Cjx1c2UgeGxpbms6aHJlZj0iI3AiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwIDApIHNrZXdZKC00MCkiPjwvdXNlPgo8L3N2Zz4=');
    }

    &__face {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      padding: 15px;
    }

    &__value {
      display: block;
      font-size: 18pt;

      &--top {
        align-self: flex-start;
      }

      &--bottom {
        align-self: flex-end;
      }
    }

    &__center {
      display: block;
      align-self: center;
      font-size: 32pt;
    }
  }
</style>
