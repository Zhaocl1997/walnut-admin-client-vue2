<template>
  <el-space size="mini">
    <el-button
      size="small"
      type="primary"
      icon="el-icon-search"
      @click="onQuery"
    >
      {{ t('component.form.query') }}
    </el-button>

    <el-button size="small" type="info" @click="onReset">
      {{ t('component.form.reset') }}
    </el-button>

    <w-button v-if="getShowExpand" size="small" type="text" @click="onToggle">
      <span>{{ getExpandText }}</span>

      <template #suffix>
        <w-arrow :active="!active"></w-arrow>
      </template>
    </w-button>
  </el-space>
</template>

<script>
  import { defineComponent, computed, ref, onMounted } from 'vue'
  import { useI18n } from '/@/hooks/core/useI18n'
  import wButton from '/@/components/UI/Button/index.vue'
  import wArrow from '/@/components/Help/Arrow/index.vue'

  import { useFormContext } from '../../hooks/useFormContext'

  export default defineComponent({
    name: 'FormQuery',

    components: {
      wButton,
      wArrow,
    },

    emits: ['reset', 'query'],

    setup(props, { emit }) {
      const { t } = useI18n()

      const { getContextProps } = useFormContext()
      const {
        schemas,
        query,
        defaultFold,
        countToFold,
        span,
      } = getContextProps()

      const active = ref(false)

      const getExpandText = computed(() => {
        return active.value
          ? t('component.form.expand')
          : t('component.form.fold')
      })

      const getShowExpand = computed(() => {
        const len = schemas.length
        return len >= countToFold && len >= 24 / span
      })

      const onQuery = () => {
        emit('query')
      }

      const onReset = () => {
        emit('reset')
      }

      const onToggle = () => {
        active.value = !active.value

        const startIndex = countToFold
        const endIndex = schemas.length

        for (let i = startIndex; i < endIndex; i++) {
          if (schemas[i].visible === undefined) {
            schemas[i].visible = true
          }
          schemas[i].visible = !schemas[i].visible
        }
      }

      const init = () => {
        if (query && defaultFold) {
          onToggle()
        }
      }

      onMounted(() => {
        init()
      })

      return {
        t,
        active,

        getExpandText,
        getShowExpand,

        onQuery,
        onReset,
        onToggle,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
