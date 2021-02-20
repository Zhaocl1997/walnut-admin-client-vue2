<template>
  <div class="w-form-query">
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
          <w-arrow :active="!isFolded"></w-arrow>
        </template>
      </w-button>
    </el-space>
  </div>
</template>

<script>
  import { defineComponent, computed, unref } from 'vue'
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

    props: {
      isFolded: Boolean,
      toggle: Function,
    },

    emits: ['reset', 'query', 'toggle'],

    setup(props, { emit }) {
      const { t } = useI18n()

      const { getContextProps } = useFormContext()
      const { span, countToFold, schemas } = getContextProps()

      const getExpandText = computed(() => {
        return props.isFolded
          ? t('component.form.expand')
          : t('component.form.fold')
      })

      const getShowExpand = computed(() => {
        const len = unref(schemas).length
        return len >= unref(countToFold) && len >= 24 / unref(span)
      })

      const onQuery = () => {
        emit('query')
      }

      const onReset = () => {
        emit('reset')
      }

      const onToggle = () => {
        emit('toggle')
      }

      return {
        t,

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
