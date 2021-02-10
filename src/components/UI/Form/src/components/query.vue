<template>
  <div v-if="query" class="w-form-query">
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

      <w-button v-if="getShowExpand" size="small" type="text" @click="toggle">
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
  import hooks from '/@/hooks'
  import wButton from '/@/components/UI/Button/index.vue'
  import wArrow from '/@/components/Help/Arrow/index.vue'

  import { useFormContext } from '../hooks/useFormContext'

  export default defineComponent({
    name: 'WFormQuery',

    components: {
      wButton,
      wArrow,
    },

    props: {
      isFolded: Boolean,
      toggle: Function,
      schemas: Array,
    },

    emits: ['reset', 'query'],

    setup(props, { emit }) {
      const { useI18n } = hooks
      const { t } = useI18n()

      const { getContextProps } = useFormContext()
      const { query, span, countToFold } = getContextProps()

      const getExpandText = computed(() => {
        return props.isFolded
          ? `${t('component.form.expand')}`
          : `${t('component.form.fold')}`
      })

      const getShowExpand = computed(() => {
        const len = props.schemas.length
        return len >= unref(countToFold) && len >= 24 / unref(span)
      })

      const onQuery = () => {
        emit('query')
      }

      const onReset = () => {
        emit('reset')
      }

      return {
        t,

        getExpandText,
        getShowExpand,

        query,

        onQuery,
        onReset,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .w-form-query {
    display: flex;
    flex-direction: row-reverse;
  }
</style>
