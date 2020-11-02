<template>
  <div>
    <el-alert
      title="w-checkbox"
      type="info"
      :closable="false"
      description="在一组可选项中进行多项选择时；单独使用可以表示两种状态之间的切换，和 switch 类似。区别在于切换 switch 会直接触发状态改变，而 checkbox 一般用于状态标记，需要和提交操作配合。"
      show-icon
    ></el-alert>

    <p>normal 当前绑定值：{{ checkboxInfo }}</p>
    <w-checkbox v-model="checkboxInfo" label-text="normal"></w-checkbox>

    <p>disabled 当前绑定值：{{ checkboxInfo2 }}</p>
    <w-checkbox v-model="checkboxInfo2" label-text="disabled" disabled></w-checkbox>

    <p>multiple-array 当前绑定值：{{ checkboxInfo3 }}</p>
    <w-checkbox v-model="checkboxInfo3" :options="options" multiple></w-checkbox>

    <p>multiple-string 当前绑定值：{{ checkboxInfo4 }}</p>
    <w-checkbox v-model="checkboxInfo4" :options="options" multiple value-format=","></w-checkbox>

    <p>multiple-button-array 当前绑定值：{{ checkboxInfo5 }}</p>
    <w-checkbox v-model="checkboxInfo5" :options="options" multiple :min="1" :max="3" button></w-checkbox>

    <p>multiple-button-string 当前绑定值：{{ checkboxInfo6 }}</p>
    <w-checkbox v-model="checkboxInfo6" :options="options" multiple button value-format=","></w-checkbox>

    <p>multiple-border-array 当前绑定值：{{ checkboxInfo7 }}</p>
    <w-checkbox v-model="checkboxInfo7" :options="options" multiple border></w-checkbox>

    <p>multiple-border-string 当前绑定值：{{ checkboxInfo8 }}</p>
    <w-checkbox v-model="checkboxInfo8" :options="options" multiple border value-format=","></w-checkbox>
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
      checkboxInfo3: [2, 4],
      checkboxInfo4: "1,3",
      checkboxInfo5: [1, 2],
      checkboxInfo6: "3,4",
      checkboxInfo7: [1, 2],
      checkboxInfo8: "3,4",

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