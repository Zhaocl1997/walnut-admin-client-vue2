<template>
  <div class="center-item">
    <p>w-select 当前绑定值：{{ select1 }}</p>
    <w-select
      v-model="select1"
      :options="options"
      optionLabel="name"
      optionValue="id"
      draggable
      multiple
    ></w-select>
  </div>
</template>

<script>
import wSelect from "@/components/UI/Select";

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
        }
      ],

      select1: ""
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