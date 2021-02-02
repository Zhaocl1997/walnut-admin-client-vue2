<template>
  <div v-if="query">WFormQueryButtonGroups</div>
</template>

<script>
  import { defineComponent } from 'vue'
  import { useFormContext } from '../hooks/useFormContext'

  export default defineComponent({
    name: 'WFormQueryButtonGroups',

    components: {},

    setup() {
      const { getContextProps } = useFormContext()
      const { query } = getContextProps()

      return {
        query,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
