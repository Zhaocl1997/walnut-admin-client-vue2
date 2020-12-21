<template>
  <div class="u-mb8 u-float-right">
    <w-table-settings-refresh :list-func="listFunc" />

    <w-table-settings-rows v-model:rows="g" />

    <w-table-settings-screen-full />

    <w-table-settings-density @density="onDensity" />
  </div>
</template>

<script>
  import { reactive, defineComponent, watch } from 'vue'

  import wTableSettingsRefresh from './tableSettingsRefresh.vue'
  import wTableSettingsRows from './tableSettingsRows.vue'
  import wTableSettingsScreenFull from './tableSettingsScreenFull.vue'
  import wTableSettingsDensity from './tableSettingsDensity.vue'

  export default defineComponent({
    name: 'WTableSettings',

    components: {
      wTableSettingsRefresh,
      wTableSettingsRows,
      wTableSettingsScreenFull,
      wTableSettingsDensity,
    },

    props: {
      listFunc: Function,

      modelValue: Array,
    },

    emits: ['update:modelValue', 'density'],

    setup(props, { attrs, emit }) {
      let g = reactive([])

      watch(
        () => props.modelValue,
        (val) => (g = val),
        {
          immediate: true,
          deep: true,
        }
      )

      watch(
        () => g,
        (val) => {
          emit('update:modelValue', val)
        },
        {
          immediate: true,
          deep: true,
        }
      )

      const onDensity = (v) => {
        emit('density', v)
      }

      return {
        g,

        onDensity,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
