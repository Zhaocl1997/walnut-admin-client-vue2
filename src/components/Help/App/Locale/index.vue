<template>
  <w-dropdown v-model="lang" :options="langLists" @command="onCommand">
    <template #default>
      <w-icon icon="language" pointer width="24"></w-icon>
    </template>
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

    props: {
      reload: {
        type: Boolean,
        default: true,
      },

      showText: {
        type: Boolean,
        default: true,
      },
    },

    setup(props, { attrs }) {
      const store = useStore()

      const lang = computed(() => store.state.app.lang)

      const onCommand = (val) => {
        store.dispatch('app/toggleLang', val)
        i18n.global.locale.value = val
        props.reload && location.reload()
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
