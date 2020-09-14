<template>
  <div class="center-item">
    <p>w-tree 当前绑定值：{{ tree1 }}</p>
    <w-tree v-model="tree1" :data="data"></w-tree>

    <p>w-tree 当前绑定值：{{ tree2 }}</p>
    <w-tree v-model="tree2" :data="data" multiple></w-tree>
  </div>
</template>

<script>
import wTree from "@/components/UI/Tree";

export default {
  name: "",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: { wTree },

  mixins: [],

  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            },
            {
              id: 11,
              label: "二级 1-2",
              children: [
                {
                  id: 12,
                  label: "三级 1-2-1"
                },
                {
                  id: 13,
                  label: "三级 1-2-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
              children: [
                {
                  id: 14,
                  label: "三级 2-1-1"
                },
                {
                  id: 15,
                  label: "三级 2-1-2"
                }
              ]
            },
            {
              id: 6,
              label: "二级 2-2",
              children: [
                {
                  id: 16,
                  label: "三级 2-2-1"
                },
                {
                  id: 17,
                  label: "三级 2-2-2"
                }
              ]
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],

      tree1: "",
      tree2: "",
      tree3: "",
      tree4: "",
      tree5: ""
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