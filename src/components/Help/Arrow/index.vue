<template>
  <w-icon
    icon="baselineKeyboardArrowDown"
    width="24"
    pointer
    :class="getClass"
  ></w-icon>
</template>

<script>
  import { ref, reactive, computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'WArrow',

    props: {
      active: {
        type: Boolean,
        default: false,
      },

      right: {
        type: Boolean,
        default: false,
      },

      left: {
        type: Boolean,
        default: false,
      },
    },

    setup(props, { attrs }) {
      const getClass = computed(() => {
        const { active, right, left } = props
        if (typeof active === 'boolean') {
          return [
            'w-arrow',
            {
              'w-arrow--active': active,
              right,
              left,
            },
          ]
        }
        return 'u-none'
      })

      return {
        getClass,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .w-arrow {
    display: inline-block;
    transform: rotate(0deg);
    transform-origin: center center;
    transition: all 0.3s ease 0.1s;

    &--active {
      transform: rotate(180deg);
    }

    &.right {
      transform: rotate(-90deg);
    }

    &.right.w-arrow--active {
      transform: rotate(90deg);
    }

    &.left {
      transform: rotate(90deg);
    }

    &.left.w-arrow--active {
      transform: rotate(-90deg);
    }
  }
</style>
