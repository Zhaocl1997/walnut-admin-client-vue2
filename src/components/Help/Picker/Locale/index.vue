<template>
  <w-dropdown v-model="lang" :options="langLists" @command="onCommand">
    <w-icon icon="language" pointer width="24"></w-icon>
  </w-dropdown>
</template>

<script>
  import { ref, reactive, computed, defineComponent, unref } from 'vue'
  import { useStore } from 'vuex'
  import { langLists, i18n } from '/@/locales'
  import wDropdown from '/@/components/UI/Dropdown/index.vue'

  export default defineComponent({
    name: 'wPickerLocale',

    components: { wDropdown },

    setup(props, { attrs }) {
      const store = useStore()

      const lang = computed(() => store.state.app.lang)

      const onCommand = (val) => {
        store.dispatch('app/toggleLang', val)
        i18n.global.locale.value = val
      }

      return {
        lang,
        langLists,
        onCommand,
      }
    },
  })
</script>

<style lang="scss">
  .w-highlight {
    background-color: rgba(236, 245, 255, 0.8);
    color: rgba(102, 177, 255, 0.8);
  }
</style>
