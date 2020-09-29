<template>
  <div>
    <p>w-checkbox 当前绑定值：{{ checkboxInfo }}</p>
    <w-checkbox v-model="checkboxInfo">normal</w-checkbox>

    <p>w-checkbox 当前绑定值：{{ checkboxInfo2 }}</p>
    <w-checkbox v-model="checkboxInfo2" disabled>disabled</w-checkbox>

    <p>w-checkbox 当前绑定值：{{ checkboxInfo3 }}</p>
    <w-checkbox v-model="checkboxInfo3" :options="options" multiple>multiple</w-checkbox>

    <p>w-checkbox 当前绑定值：{{ checkboxInfo4 }}</p>
    <w-checkbox v-model="checkboxInfo4" :options="options" multiple button>multiple-button</w-checkbox>

    <p>w-checkbox 当前绑定值：{{ checkboxInfo5 }}</p>
    <w-checkbox v-model="checkboxInfo5" :options="options" multiple border>multiple-border</w-checkbox>
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
      checkboxInfo: false,
      checkboxInfo2: true,
      checkboxInfo3: ["D"],
      checkboxInfo4: ["A"],
      checkboxInfo5: [],
      checkboxInfo6: false,
      checkboxInfo7: false,

      options: [
        {
          value: "A"
        },
        {
          value: "B"
        },
        {
          value: "C"
        },
        {
          value: "D"
        },
        {
          value: "E",
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