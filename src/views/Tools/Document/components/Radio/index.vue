<template>
  <div class="center-item">
    <p>w-radio 当前绑定值：{{ radio1 }}</p>
    <w-radio v-model="radio1" :options="options"></w-radio>

    <p>w-radio 当前绑定值：{{ radio2 }}</p>
    <w-radio v-model="radio2" :options="options" disabled></w-radio>

    <p>w-radio 当前绑定值：{{ radio3 }}</p>
    <w-radio v-model="radio3" :options="options" border></w-radio>

    <p>w-radio 当前绑定值：{{ radio4 }}</p>
    <w-radio v-model="radio4" :options="options" button></w-radio>
  </div>
</template>

<script>
import wRadio from "@/components/UI/Base/Radio";

export default {
  name: "",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: { wRadio },

  mixins: [],

  data() {
    return {
      radio1: "",
      radio2: false,
      radio3: "",
      radio4: "",
      radio5: "",
      radio6: "",
      radio7: "",

      options: [
        {
          value: true,
          label: "是"
        },
        {
          value: false,
          label: "否"
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