<template>
  <div class="center-item">
    <p>w-tree 当前绑定值：{{ tree1 }}</p>
    <w-tree v-model="tree1" :data="data" :props="props"></w-tree>

    <p>w-tree 当前绑定值：{{ tree2 }}</p>
    <w-tree v-model="tree2" :data="data" multiple :props="props"></w-tree>
  </div>
</template>

<script>
import wTree from "@/components/UI/Base/Tree";

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
          _id: 1,
          _label: "一级 1",
          _children: [
            {
              _id: 4,
              _label: "二级 1-1",
              _children: [
                {
                  _id: 9,
                  _label: "三级 1-1-1"
                },
                {
                  _id: 10,
                  _label: "三级 1-1-2"
                }
              ]
            },
            {
              _id: 11,
              _label: "二级 1-2",
              _children: [
                {
                  _id: 12,
                  _label: "三级 1-2-1"
                },
                {
                  _id: 13,
                  _label: "三级 1-2-2",
                  _disabled: true
                }
              ]
            }
          ]
        },
        {
          _id: 2,
          _label: "一级 2",
          _children: [
            {
              _id: 5,
              _label: "二级 2-1",
              _children: [
                {
                  _id: 14,
                  _label: "三级 2-1-1"
                },
                {
                  _id: 15,
                  _label: "三级 2-1-2"
                }
              ]
            },
            {
              _id: 6,
              _label: "二级 2-2",
              _children: [
                {
                  _id: 16,
                  _label: "三级 2-2-1",
                  _disabled: true
                },
                {
                  _id: 17,
                  _label: "三级 2-2-2"
                }
              ]
            }
          ]
        },
        {
          _id: 3,
          _label: "一级 3",
          _children: [
            {
              _id: 7,
              _label: "二级 3-1",
              disabled: true
            },
            {
              _id: 8,
              _label: "二级 3-2"
            }
          ]
        }
      ],

      props: {
        id: "_id",
        label: "_label",
        children: "_children",
        disabled: "_disabled"
      },

      tree1: 14,
      tree2: [9, 17],
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