<template>
  <div class="center-item">
    <p>w-select-tree 当前绑定值：{{ selectTree1 }}</p>
    <w-select-tree v-model="selectTree1" :data="data" :props="props"></w-select-tree>

    <p>w-select-tree 当前绑定值：{{ selectTree2 }}</p>
    <w-select-tree v-model="selectTree2" :data="data" multiple :props="props"></w-select-tree>

    <p>w-select-tree 当前绑定值：{{ selectTree3 }}</p>
    <w-select-tree v-model="selectTree3" :data="menuOptions" multiple :props="menuProps"></w-select-tree>
  </div>
</template>

<script>
import wSelectTree from "@/components/UI/Base/SelectTree/index";
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
          _id: 1,
          label: "一级 1",
          children: [
            {
              _id: 4,
              label: "二级 1-1",
              children: [
                {
                  _id: 9,
                  label: "三级 1-1-1"
                },
                {
                  _id: 10,
                  label: "三级 1-1-2"
                }
              ]
            },
            {
              _id: 11,
              label: "二级 1-2",
              children: [
                {
                  _id: 12,
                  label: "三级 1-2-1"
                },
                {
                  _id: 13,
                  label: "三级 1-2-2"
                }
              ]
            }
          ]
        },
        {
          _id: 2,
          label: "一级 2",
          children: [
            {
              _id: 5,
              label: "二级 2-1",
              children: [
                {
                  _id: 14,
                  label: "三级 2-1-1"
                },
                {
                  _id: 15,
                  label: "三级 2-1-2"
                }
              ]
            },
            {
              _id: 6,
              label: "二级 2-2",
              children: [
                {
                  _id: 16,
                  label: "三级 2-2-1"
                },
                {
                  _id: 17,
                  label: "三级 2-2-2"
                }
              ]
            }
          ]
        },
        {
          _id: 3,
          label: "一级 3",
          children: [
            {
              _id: 7,
              label: "二级 3-1"
            },
            {
              _id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],

      props: {
        id: "_id"
      },

      menuOptions: [],
      menuProps: {
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