<template>
  <div class="center-item">
    <p>w-select 多选数组：{{ select1 }}</p>
    <w-select v-model="select1" :options="options" draggable multiple></w-select>

    <p>w-select 多选字符串：{{ select2 }}</p>
    <w-select v-model="select2" :options="options" draggable multiple value-format=","></w-select>

    <p>w-select 多选对象：{{ select3 }}</p>
    <w-select v-model="select3" :options="options" draggable multiple value-key="value"></w-select>
  </div>
</template>

<script>
import wSelect from "@/components/UI/Base/Select";

export default {
  name: "",

  components: { wSelect },

  mixins: [],

  data() {
    return {
      options: [
        {
          value: 1,
          label: "jack"
        },
        {
          value: 2,
          label: "tom"
        },
        {
          value: 3,
          label: "rose"
        },
        {
          value: 4,
          label: "lucy"
        },
        {
          value: 5,
          label: "jimmy"
        },
        {
          value: 6,
          label: "chunk"
        },
        {
          value: 7,
          label: "kim"
        },
        {
          value: 8,
          label: "gustvo"
        },
        {
          value: 9,
          label: "ermenchant"
        }
      ],

      select1: [2, 6, 4],
      select2: "5,7,4",
      select3: [
        { value: 6, label: "chunk" },
        { value: 3, label: "rose" },
        { value: 4, label: "lucy" },
        { value: 2, label: "tom" }
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