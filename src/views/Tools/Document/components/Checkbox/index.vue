<template>
  <div>
    <p>w-checkbox 当前绑定值：{{ checkboxInfo }}</p>
    <w-checkbox v-model="checkboxInfo" label="normal"></w-checkbox>

    <p>w-checkbox 当前绑定值：{{ checkboxInfo2 }}</p>
    <w-checkbox v-model="checkboxInfo2" label="disabled" disabled></w-checkbox>

    <p>w-checkbox 当前绑定值：{{ checkboxInfo3 }}</p>
    <w-checkbox v-model="checkboxInfo3" :options="options" multiple :max="1"></w-checkbox>

    <p>w-checkbox 当前绑定值：{{ checkboxInfo4 }}</p>
    <w-checkbox v-model="checkboxInfo4" :options="options" multiple></w-checkbox>

    <p>w-checkbox 当前绑定值：{{ checkboxInfo5 }}</p>
    <w-checkbox v-model="checkboxInfo5" :options="options" multiple button></w-checkbox>

    <p>w-checkbox 当前绑定值：{{ checkboxInfo6 }}</p>
    <w-checkbox v-model="checkboxInfo6" :options="options" multiple border></w-checkbox>
  </div>
</template>

<script>
import wCheckbox from "@/components/UI/Base/Checkbox";

export default {
  name: "",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: { wCheckbox },

  mixins: [],

  data() {
    return {
      checkboxInfo: undefined,
      checkboxInfo2: undefined,
      checkboxInfo3: [4],
      checkboxInfo4: [1, 3],
      checkboxInfo5: [2, 4],
      checkboxInfo6: [1, 4],
      checkboxInfo7: undefined,
      checkboxInfo8: undefined,
      checkboxInfo9: undefined,
      checkboxInfo10: undefined,

      options: [
        {
          value: 1,
          label: "A"
        },
        {
          value: 2,
          label: "B"
        },
        {
          value: 3,
          label: "C"
        },
        {
          value: 4,
          label: "D"
        },
        {
          value: 5,
          label: "E",
          disabled: true
        }
      ]
    };
  },

  computed: {},

  watch: {},

  props: {},

  methods: {},

  created() {},

  mounted() {},

  beforeCreate() {},

  beforeMount() {},

  beforeUpdate() {},

  updated() {},

  beforeDestroy() {},

  destroyed() {},

  activated() {}
};
</script>

<style scoped>
</style>