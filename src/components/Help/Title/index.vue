<template>
  <div class="w-title">
    <div :class="getClass">{{ text }}</div>
  </div>
</template>

<script>
  import { ref, reactive, computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'WTitle',

    props: {
      showLeft: {
        type: Boolean,
        default: false,
      },

      showBottom: {
        type: Boolean,
        default: false,
      },
    },

    setup(props, { attrs, slots }) {
      const text = slots.default && slots.default()[0].children

      const getClass = computed(() => {
        const { showLeft, showBottom } = props

        return [
          'w-title__text',
          {
            'w-title__text-left': showLeft,
            'w-title__text-bottom': showBottom,
          },
        ]
      })

      return {
        text,
        getClass,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .w-title {
    height: 30px;
    line-height: 30px;

    &__text {
      padding-bottom: 10px;
      position: relative;
      font-size: 16px;
      font-weight: 700;
      user-select: none;

      &-left {
        padding-left: 15px;

        &::before {
          content: ' ';
          border-left: 4px solid orangered;
          display: inline-block;
          height: 16px;
          position: absolute;
          top: 50%;
          left: 0;
          margin-top: -13px;
        }
      }

      &-bottom {
        border-bottom: 1px solid #ebebeb;
      }
    }
  }
</style>
