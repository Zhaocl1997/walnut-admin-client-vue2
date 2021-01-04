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
      active: Boolean,
    },

    setup(props, { attrs }) {
      const getClass = computed(() => {
        const { active } = props
        if (typeof active === 'boolean') {
          return [
            'w-arrow',
            {
              'w-arrow--active': active,
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
    transition: all 0.3s ease 0.1s;
    transform-origin: center center;

    &--active {
      transform: rotate(180deg);
    }
  }
</style>
