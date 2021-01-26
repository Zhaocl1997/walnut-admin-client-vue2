<template>
  <div class="w-table__settings">
    <el-space size="mini">
      <w-table-settings-refresh />

      <w-table-settings-rows />

      <w-table-settings-screen-full />

      <w-table-settings-density />
    </el-space>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'

  import wTableSettingsRefresh from './components/tableSettingsRefresh.vue'
  import wTableSettingsRows from './components/tableSettingsRows.vue'
  import wTableSettingsScreenFull from './components/tableSettingsScreenFull.vue'
  import wTableSettingsDensity from './components/tableSettingsDensity.vue'

  export default defineComponent({
    name: 'WTableSettings',

    components: {
      wTableSettingsRefresh,
      wTableSettingsRows,
      wTableSettingsScreenFull,
      wTableSettingsDensity,
    },

    setup() {
      return {}
    },
  })
</script>

<style lang="scss" scoped></style>
