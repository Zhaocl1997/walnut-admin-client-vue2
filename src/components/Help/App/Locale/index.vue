<template>
  <w-dropdown v-model="lang" :options="langLists" @command="onCommand">
    <template #default>
      <div class="u-pointer">
        <w-icon icon="language" width="24"></w-icon>
        <span v-if="showText" class="w-locale__text">{{ langText }}</span>
      </div>
    </template>
  </w-dropdown>
</template>

<script>
  import { ref, reactive, computed, defineComponent, unref } from 'vue'
  import { useStore } from 'vuex'
  import { langLists, i18n } from '/@/locales'
  import wDropdown from '/@/components/UI/Dropdown/index.vue'

  export default defineComponent({
    name: 'WPickerLocale',

    components: { wDropdown },

    props: {
      reload: {
        type: Boolean,
        default: false,
      },

      showText: {
        type: Boolean,
        default: false,
      },
    },

    setup(props, { attrs }) {
      const store = useStore()

      const lang = computed(() => store.state.app.lang)

      const langText = computed(
        () => langLists.find((i) => i.value === lang.value).label
      )

      const onCommand = (val) => {
        store.dispatch('app/toggleLang', val)
        i18n.global.locale.value = val
        props.reload && location.reload()
      }

      return {
        lang,
        langText,
        langLists,
        onCommand,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .w-locale__text {
    position: absolute;
    top: 3px;
    width: max-content;
    margin-left: 5px;
    font-weight: 700;
  }
</style>
