<template>
  <div class="center-item">
    <p>w-select 多选数组：{{ select1 }}</p>
    <w-select
      v-model="select1"
      :options="options"
      draggable
      multiple
    ></w-select>

    <p>w-select 多选字符串：{{ select2 }}</p>
    <w-select
      v-model="select2"
      :options="options"
      draggable
      multiple
      value-format=","
    ></w-select>

    <p>w-select 多选对象：{{ select3 }}</p>
    <w-select
      v-model="select3"
      :options="options"
      draggable
      multiple
      value-key="value"
    ></w-select>

    <p>w-select 多选对象：{{ select4 }}</p>
    <w-select
      v-model="select4"
      :options="options"
      multiple
      @change="onChange"
    ></w-select>
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
          value: "1",
          label: "按上次你去京城v哦啊我你说的佛牌爱神的箭爱普生电脑放歌爬山的放假安排是怕送大炮士大夫就怕数据大屏时间点卡商品都怕是假的怕搜集的怕死富婆啊是免费哪怕怕时间跑商的静安寺平均得分爬升阶段卡片上发泡放假安排【送到就怕设定破案设计风格怕是警方破解啊【反革命",
          groupId: "a",
        },
        {
          value: "2",
          label: "tom",
          groupId: "a",
        },
        {
          value: "3",
          label: "rose",
          groupId: "a",
        },
        {
          value: "4",
          label: "lucy",
          groupId: "a",
        },
        {
          value: "5",
          label: "jimmy",
        },
        {
          value: "6",
          label: "chunk",
        },
        {
          value: "7",
          label: "kim",
        },
        {
          value: "8",
          label: "gustvo",
        },
        {
          value: "9",
          label: "ermenchant",
        },
      ],

      select1: ["2", "6", "4"],
      select2: "5,7,4",
      select3: [
        { value: "6", label: "chunk" },
        { value: "3", label: "rose" },
        { value: "4", label: "lucy" },
        { value: "2", label: "tom" },
      ],
      select4: [],
    };
  },

  computed: {},

  watch: {},

  props: {},

  methods: {
    onChange(val) {
      const GA = this.options
        .filter((i) => i.groupId === "a")
        .map((i) => i.value);

      const jiaoji = (a, b) =>
        a.filter((v) => {
          return b.indexOf(v) > -1;
        });

      for (let i = 0; i < val.length; i++) {
        const single = val[i];

        if (val.length === 1) {
          break;
        }

        if (val.length > 1 && jiaoji(GA, val).length === 1) {
          break;
        }

        const hasValue = GA.includes(single);

        if (hasValue) {
          val.splice(i, 1);
        }
      }

      this.$nextTick(() => {
        console.log(val);
      });
    },
  },

  created() {},

  mounted() {},

  beforeCreate() {},

  beforeMount() {},

  beforeUpdate() {},

  updated() {},

  beforeDestroy() {},

  destroyed() {},

  activated() {},
};
</script>

<style scoped>
</style>