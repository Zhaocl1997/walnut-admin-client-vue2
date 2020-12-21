<template>
  <Icon :icon="icons[icon]" :class="{ 'u-pointer': pointer }" />
</template>

<script>
  import { Icon } from '@iconify/vue'
  import { defineComponent, reactive } from 'vue'
  import { iconsLists } from './icons'

  export default defineComponent({
    name: 'WIcon',

    components: { Icon },

    props: {
      ...Icon.props,

      icon: String,

      pointer: Boolean,
    },

    setup(props, { attrs }) {
      const icons = reactive(iconsLists)
      return { icons }
    },
  })
</script>

<style lang="scss" scoped></style>
