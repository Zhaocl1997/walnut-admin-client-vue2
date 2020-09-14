<template>
  <div class="center-item">
    <p>w-tag 当前绑定值：{{ tag1 }}</p>
    <w-tag v-model="tag1" draggable addable closable></w-tag>

    <p>w-tag 当前绑定值：{{ tag2 }}</p>
    <w-tag v-model="tag2" size="small" type="warning" effect="dark" addable></w-tag>

    <p>w-tag 当前绑定值：{{ tag3 }}</p>
    <w-tag v-model="tag3" valueFormat="," draggable addable closable></w-tag>
  </div>
</template>

<script>
import wTag from "@/components/UI/Tag";

export default {
  name: "",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: { wTag },

  mixins: [],

  data() {
    return {
      tag1: ["1", "2", "3", "4", "5"],
      tag2: [],
      tag3: "1,2,3,4,5"
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