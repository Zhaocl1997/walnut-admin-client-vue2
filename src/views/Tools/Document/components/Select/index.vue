<template>
  <div class="center-item">
    <p>w-select 多选数组：{{ select1 }}</p>
    <w-select
      v-model="select1"
      :options="options"
      optionLabel="name"
      optionValue="id"
      draggable
      multiple
    ></w-select>

    <p>w-select 多选字符串：{{ select2 }}</p>
    <w-select
      v-model="select2"
      :options="options"
      optionLabel="name"
      optionValue="id"
      draggable
      multiple
      value-format=","
    ></w-select>

    <p>w-select 多选对象：{{ select3 }}</p>
    <w-select
      v-model="select3"
      :options="options"
      optionLabel="name"
      optionValue="id"
      draggable
      multiple
      value-key="id"
    ></w-select>
  </div>
</template>

<script>
import wSelect from "@/components/UI/Select/index2";

export default {
  name: "",

  components: { wSelect },

  mixins: [],

  data() {
    return {
      options: [
        {
          id: 1,
          name: "jack"
        },
        {
          id: 2,
          name: "tom"
        },
        {
          id: 3,
          name: "rose"
        },
        {
          id: 4,
          name: "lucy"
        },
        {
          id: 5,
          name: "jimmy"
        },
        {
          id: 6,
          name: "chunk"
        },
        {
          id: 7,
          name: "kim"
        },
        {
          id: 8,
          name: "gustvo"
        },
        {
          id: 9,
          name: "ermenchant"
        }
      ],

      select1: [2, 6, 4],
      select2: "5,7,4",
      select3: [
        { id: 6, name: "chunk" },
        { id: 3, name: "rose" },
        { id: 4, name: "lucy" },
        { id: 2, name: "tom" }
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