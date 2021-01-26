<template>
  <div class="w-title">
    <span :class="getClass">
      {{ text }}
      <w-help-message v-if="content" v-bind="getHelpProps"></w-help-message>
    </span>
  </div>
</template>

<script>
  import { ref, reactive, computed, defineComponent, unref } from 'vue'
  import wHelpMessage from '../HelpMessage/index.vue'
  import { omit } from 'easy-fns-ts'

  export default defineComponent({
    name: 'WTitle',

    components: { wHelpMessage },

    props: {
      ...wHelpMessage.props,

      showLeft: {
        type: Boolean,
        default: false,
      },

      showBottom: {
        type: Boolean,
        default: false,
      },

      placement: {
        type: String,
        default: 'right',
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

      const getHelpProps = computed(() => {
        return omit(unref(props), ['showLeft', 'showBottom'])
      })

      return {
        text,
        getClass,
        getHelpProps,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .w-title {
    height: 30px;
    line-height: 30px;

    &__text {
      position: relative;
      padding-bottom: 8px;
      font-weight: 700;
      font-size: 16px;

      &-left {
        padding-left: 15px;

        &::before {
          position: absolute;
          top: 50%;
          left: 0;
          display: inline-block;
          height: 16px;
          margin-top: -13px;
          border-left: 4px solid orangered;
          content: ' ';
        }
      }

      &-bottom {
        border-bottom: 1px solid #ebebeb;
      }
    }
  }
</style>
