<template>
  <el-button v-bind="getBindValue">
    <i v-if="prefixIcon" :class="prefixIcon" />

    <span v-if="$slots.default" style="margin: 3px">
      <span v-if="delayText">{{ delayText }}</span>
      <slot v-else />
    </span>

    <i v-if="suffixIcon" :class="suffixIcon" />
  </el-button>
</template>

<script>
  import { ElButton } from 'element-plus'
  import { ref, computed, defineComponent, unref } from 'vue'

  export default defineComponent({
    name: 'WButton',

    inheritAttrs: false,

    props: {
      ...ElButton.props,

      prefixIcon: String,
      suffixIcon: String,

      retryDelay: [String, Number],
      loadDelay: [String, Number],
    },

    emits: ['click'],

    setup(props, { attrs, slots, emit }) {
      const originText = slots.default && slots.default()[0].children

      let delayText = ref('')

      let loadDelay = unref(props.loadDelay)
      let retryDelay = unref(props.retryDelay)

      let selfDisabled = ref(false)
      let selfLoading = ref(false)

      const onClick = (event) => {
        if (retryDelay) {
          selfDisabled.value = true

          let intervalId = setInterval(() => {
            delayText.value = `(${retryDelay}秒)后重试`
            --retryDelay

            if (+retryDelay < 0) {
              retryDelay = props.retryDelay
              delayText.value = originText
              selfDisabled.value = false

              clearInterval(intervalId)
            }
          }, 1000)
        }

        if (loadDelay) {
          selfLoading.value = true

          setTimeout(() => {
            selfLoading.value = false
          }, +loadDelay * 1000)
        }

        emit('click', event)
      }

      const getDisabled = computed(() => selfDisabled.value || props.disabled)
      const getLoading = computed(() => selfLoading.value || props.loading)

      const getBindValue = computed(() => {
        return {
          ...attrs,
          ...props,
          onClick,
          disabled: getDisabled.value,
          loading: getLoading.value,
        }
      })

      return {
        getBindValue,
        delayText,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
