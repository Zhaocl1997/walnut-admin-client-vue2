<template>
  <div
    v-bind="$attrs"
    :class="['Flipper', { 'Flipper--flipped': flipped }]"
    :style="styles.wrapper"
    @click="onClick"
  >
    <div class="Flipper__face Flipper__face--front" :style="styles.face">
      <slot name="front" />
    </div>
    <div class="Flipper__face Flipper__face--back" :style="styles.face">
      <slot name="back" />
    </div>
  </div>
</template>

<script>
  /**
   * Curries a predicate function to check if value matches pattern.
   * @param {RegExp} pattern
   * @returns {(value: string) => boolean}
   */
  const isPattern = (pattern) => (value) => pattern.test(value)

  /**
   * Check if value is a CSS Length.
   */
  const isCSSLength = isPattern(
    /^\+?(\d*\.)?\d+(em|ex|ch|rem|vh|vw|vmin|vmax|px|mm|cm|in|pt|pc|%)$/i
  )

  /**
   * Check if value is a CSS Time.
   */
  const isCSSTime = isPattern(/^\+?(\d*\.)?\d+(ms|s)$/i)

  import { computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'wFlipper',

    inheritAttrs: false,

    props: {
      flipped: {
        type: Boolean,
        default: false,
      },

      width: {
        type: String,
        default: '100%',
        validator: isCSSLength,
      },

      height: {
        type: String,
        default: '100%',
        validator: isCSSLength,
      },

      duration: {
        type: String,
        default: '0.5s',
        validator: isCSSTime,
      },

      transition: {
        type: String,
        default: 'ease-in',
      },
    },

    emits: ['click'],

    setup(props, { attrs, emit }) {
      const styles = computed(() => {
        const { width, height, duration, transition } = props
        return {
          wrapper: { width: width, height: height },
          face: {
            transitionDuration: duration,
            transitionTimingFunction: transition,
          },
        }
      })

      const onClick = (e) => emit('click', e)

      return {
        styles,
        onClick,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .Flipper {
    position: relative;
    perspective: 1000px;
  }
  .Flipper__face {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }
  .Flipper__face--back,
  .Flipper--flipped .Flipper__face--front {
    transform: rotateY(180deg);
    visibility: hidden;
  }
  .Flipper--flipped .Flipper__face--back {
    transform: rotateY(360deg);
    visibility: visible;
  }

  /* .Flipper {
  position: relative;
  perspective: 1000px;

  &__face {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }

  &__face--back,
  &--flipped &__face--front {
    transform: rotateY(180deg);
    visibility: hidden;
  }

  &--flipped,
  &__face--back {
    transform: rotateY(360deg);
    visibility: visible;
  }
} */
</style>
