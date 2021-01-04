<template>
  <div class="w-title">
    <div class="w-title__text">{{ text }}</div>
  </div>
</template>

<script>
  import { ref, reactive, computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'WTitle',

    props: {},

    setup(props, { attrs, slots }) {
      const text = slots.default()[0].children

      return {
        text,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .w-title {
    height: 30px;
    line-height: 30px;
  }

  .w-title__text {
    padding-bottom: 10px;
    position: relative;
    padding-left: 15px;
    font-size: 16px;
    font-weight: 700;
    user-select: none;
  }

  .w-title__text:before {
    content: ' ';
    border-left: 4px solid orangered;
    display: inline-block;
    height: 16px;
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -13px;
  }
</style>
