<template>
  <div>
    <el-alert
      title="w-radio"
      type="info"
      :closable="false"
      description="用于在多个备选项中选中单个状态。和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。"
      show-icon
    ></el-alert>

    <p>normal 当前绑定值：{{ radio1 }}</p>
    <w-radio v-model="radio1" :options="options"></w-radio>

    <p>disabled 当前绑定值：{{ radio2 }}</p>
    <w-radio v-model="radio2" :options="options" disabled></w-radio>

    <p>border 当前绑定值：{{ radio3 }}</p>
    <w-radio v-model="radio3" :options="optionsMore" border></w-radio>

    <p>button 当前绑定值：{{ radio4 }}</p>
    <w-radio v-model="radio4" :options="optionsMore" button></w-radio>
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
      radio1: true,
      radio2: false,
      radio3: 1,
      radio4: 5,

      options: [
        {
          value: true,
          label: "是"
        },
        {
          value: false,
          label: "否"
        }
      ],

      optionsMore: [
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