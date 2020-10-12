<template>
  <div class="center-item">
    <p>w-select-tree 当前绑定值：{{ selectTree1 }}</p>
    <w-select-tree v-model="selectTree1" :data="data"></w-select-tree>

    <p>w-select-tree 当前绑定值：{{ selectTree2 }}</p>
    <w-select-tree v-model="selectTree2" :data="data" multiple></w-select-tree>

    <p>w-select-tree 当前绑定值：{{ selectTree3 }}</p>
    <w-select-tree v-model="selectTree3" :data="menuOptions" multiple :treeProps="treeProps"></w-select-tree>
  </div>
</template>

<script>
import wSelectTree from "@/components/UI/Base/SelectTree/index2";
import { menuOptions } from "@/api/system/menu";

export default {
  name: "",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: { wSelectTree },

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

      menuOptions: [],
      treeProps: {
        id: "_id",
        label: "title",
        children: "subs"
      },

      selectTree1: 7,
      selectTree2: [13, 14],
      selectTree3: [],
      selectTree4: "",
      selectTree5: ""
    };
  },

  computed: {},

  watch: {},

  props: {},

  methods: {},

  created() {},

  mounted() {
    menuOptions().then(res => {
      this.menuOptions = res.data;
    });
  },

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