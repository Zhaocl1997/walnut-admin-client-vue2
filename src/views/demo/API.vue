<template>
  <div />
</template>

<script>
  import { ref, reactive, computed, defineComponent } from 'vue'

  const k = {
    u: 'API_TEST_URL',
    k: 'API_TEST_KEY',
    v: 'API_TEST_VALUE',
  }

  export default defineComponent({
    name: 'WAPI',

    components: {},

    props: {},

    setup(props, { attrs }) {
      const form = reactive({})
      const result = reactive({})
    },
  })
</script>

<style lang="scss" scoped></style>
