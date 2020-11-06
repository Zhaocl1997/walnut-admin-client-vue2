<template>
  <!-- <el-tooltip :disabled="showTooltip" effect="dark" :open-delay="100" placement="top-start">
  <div v-html="tooltipContent" slot="content"></div>-->
  <el-select
    ref="wSelect"
    class="drag-select"
    v-model="selectedValue"
    :multiple="multiple"
    :disabled="disabled"
    :valueKey="valueKey"
    :size="size"
    :clearable="clearable"
    :collapseTags="collapseTags"
    :multipleLimit="multipleLimit"
    :placeholder="placeholder"
    :filterable="filterable"
    :allowCreate="allowCreate"
    :filterMethod="filterMethod"
    :remote="remote"
    :remoteMethod="selfRemoteMethod"
    :loading="selfLoading"
    :loadingText="loadingText"
    :noMatchText="noMatchText"
    :noDataText="noDataText"
    :popper-class="'id' + selfId"
    :reserveKeyword="reserveKeyword"
    :defaultFirstOption="defaultFirstOption"
    :popperAppendToBody="popperAppendToBody"
    :automaticDropdown="automaticDropdown"
    @change="onChange"
    @visible-change="onVisibleChange"
    @remove-tag="onRemoveTag"
    @clear="onClear"
    @blur="onBlur"
    @focus="onFocus"
    :style="style"
  >
    <!-- v-loadmore="loadmore" -->
    <el-option
      v-for="item in selfOptions"
      :key="item[optionValue]"
      :label="item[optionLabel]"
      :value="valueKey ? item :item[optionValue]"
      :disabled="item[optionValue] == selfId"
    ></el-option>
  </el-select>
  <!-- </el-tooltip> -->
</template>

<script>
import Sortable from "sortablejs";
import BlockMixins from "@/mixins/Block";
import ValueMixins from "@/mixins/Value";
import { isEmpty, randomId } from "easy-fns/lib/utils";
import { isArray } from "easy-fns/lib/type";

export default {
  name: "wSelect",

  components: {},

  mixins: [BlockMixins()],

  model: {
    event: "change",
    prop: "value"
  },

  data() {
    return {
      count: 0, // 下拉框到头计数用
      selfId: randomId(16), // 下拉框的唯一ID,用于 遮罩层定位和尽头信息ID
      selectedValue: "", // 绑定值

      // options和loading
      selfOptions: this.options,
      selfLoading: this.loading,

      // 远程搜索参数
      queryParams: {
        [this.optionLabel]: "", // 默认模糊搜索字段
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
    };
  },

  computed: {
    selfValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },

    // 是否符合valueFormat条件
    isForamattable() {
      return (
        this.multiple && !isEmpty(this.valueFormat) && isEmpty(this.valueKey)
      );
    },

    // 是否可拖拽
    isDraggable() {
      return this.multiple && this.draggable && !this.collapseTags;
    },

    // 是否符合远程搜索条件
    isRemoteable() {
      return (
        isEmpty(this.optionLabel) &&
        isEmpty(this.optionValue) &&
        isEmpty(this.initFunc) &&
        isEmpty(this.getFunc)
      );
    },

    // 判断是否显示tooltip
    showTooltip() {
      return isEmpty(this.selfValue) || this.disabled || !this.tooltip;
    },

    // 处理tooltip内容
    tooltipContent() {
      if (!this.showTooltip && this.selfOptions.length !== 0) {
        if (!this.multiple) {
          const l = this.selfOptions.find(
            i => i[this.optionValue] == this.selfValue
          );

          if (isEmpty(l)) {
            return;
          }

          return l[this.optionLabel];
        } else {
          let result = [];
          this.selfValue.map(e => {
            let index = this.selfOptions.findIndex(
              i => i[this.optionValue] === e
            );
            if (index !== -1) {
              let label = this.selfOptions[index][this.optionLabel];
              result.push(label);
            }
          });

          return result.join("<br/>");
        }
      }
      return "";
    }
  },

  watch: {
    // 处理value,适用于同一个页面反复赋值
    value(newV, oldV) {
      if (!isEmpty(newV) && newV != oldV) {
        if (!isArray(newV)) {
          this.getData(newV);
        } else {
          newV.map(i => {
            this.getData(i);
          });
        }
      }
    },

    // 处理options
    options(newV, oldV) {
      if (!isEmpty(newV) && newV != oldV) {
        this.selfOptions = newV;
      }
    }
  },

  props: {
    // origin
    value: [String, Number, Array, Boolean],
    multiple: Boolean,
    disabled: Boolean,
    valueKey: String,
    size: String,
    clearable: Boolean,
    collapseTags: Boolean,
    multipleLimit: Number,
    placeholder: String,
    filterable: Boolean,
    allowCreate: Boolean,
    filterMethod: Function,
    remote: Boolean,
    remoteMethod: Function,
    loading: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    popperClass: String,
    reserveKeyword: Boolean,
    defaultFirstOption: Boolean,
    popperAppendToBody: { type: Boolean, default: true },
    automaticDropdown: Boolean,

    // custom
    pageNum: { type: String, default: "1" },
    pageSize: { type: String, default: "10" },
    valueFormat: String,
    valueType: { type: String, default: "number" },

    tooltip: { type: Boolean, default: false },
    draggable: { type: Boolean, default: false },

    options: { type: Array, default: () => [] },
    optionLabel: { type: String, default: "label" },
    optionValue: { type: String, default: "value" },

    initFunc: Function,
    getFunc: Function,
    initResLevel: { type: String, default: "rows" },
    getResLevel: { type: String, default: "data" }
  },

  methods: {
    /* 初始化 */
    async init() {
      if (this.isDraggable) {
        this.onDraggable();
      }

      if (this.isForamattable) {
        this.selectedValue = this.onValueType(
          this.value.split(this.valueFormat)
        );
      } else {
        this.selectedValue = this.value;
      }

      if (!this.isRemoteable) {
        return;
      }

      this.selfLoading = true;

      const res = await this.initFunc(this.queryParams);

      if (res.code === 200) {
        // 处理初始化res的数据层级
        this.selfOptions = this.initResLevel.includes(".")
          ? res[this.initResLevel.split(".")[0]][
              this.initResLevel.split(".")[1]
            ]
          : res[this.initResLevel];

        this.selfLoading = false;
        this.feedBack();
      }
    },

    /* 回显 */
    async feedBack() {
      if (isEmpty(this.selfValue)) {
        return;
      }

      if (!isArray(this.selfValue)) {
        await this.getData(this.selfValue);
      } else {
        const promises = await this.selfValue.map(async i => {
          return await this.getData(i);
        });

        await Promise.all(promises);
      }
    },

    /* 通过id获取数据 */
    async getData(v) {
      if (!this.isRemoteable) {
        return;
      }

      // options为空 退出
      if (isEmpty(this.selfOptions)) {
        return;
      }

      // 查询是否已经在数组内
      const index = this.selfOptions.findIndex(i => i[this.optionValue] == v);

      // 没找到
      if (index === -1) {
        const res = await this.getFunc(v);

        // 处理回显res的数据层级
        const getResData = this.getResLevel.includes(".")
          ? res[this.getResLevel.split(".")[0]][
              this.getResLevel.split(".")[1]
            ][0]
          : res[this.getResLevel];

        if (res.code === 200 && getResData) {
          this.selfOptions.unshift({
            [this.optionValue]: v,
            [this.optionLabel]: getResData[this.optionLabel]
          });
        }
      }
    },

    /** 处理远程搜索 */
    selfRemoteMethod(query) {
      // 如果不符合远程搜索的条件,直接推出函数
      if (!this.isRemoteable) {
        return;
      }

      // 内容不为空时触发事件
      if (query !== "") {
        this.selfLoading = true;
        this.queryParams[this.optionLabel] = query;
        this.initFunc(this.queryParams).then(res => {
          if (res.code === 200) {
            this.selfLoading = false;

            // 处理初始化res的数据层级
            this.selfOptions = this.initResLevel.includes(".")
              ? res[this.initResLevel.split(".")[0]][
                  this.initResLevel.split(".")[1]
                ]
              : res[this.initResLevel];
          }
        });
      }
    },

    /** 加载更多 */
    loadmore() {
      // 如果不符合远程搜索的条件,直接推出函数
      if (!this.isRemoteable) {
        return;
      }

      // 实例化下拉框遮罩层
      const l = this.openLoading(`.id${this.selfId}`); // 必须以字母开头

      this.queryParams.pageNum += 1;
      this.initFunc(this.queryParams).then(res => {
        if (res.code === 200) {
          // 解决分页问题：如果返回的数组长度不足10，直接退出函数
          if (res.total) {
            const hasNextPage =
              Math.ceil(res.total / 10) > this.queryParams.pageNum;
            if (!hasNextPage) {
              this.count++;

              // 只有在初次走到这里时加入到头信息
              if (this.count === 1) {
                this.selfOptions.push({
                  [this.optionValue]: this.selfId,
                  [this.optionLabel]: "已经到尽头了..."
                });
              }

              l.close();
              return;
            }
          }

          // 处理初始化res的数据层级
          const initResData = this.initResLevel.includes(".")
            ? res[this.initResLevel.split(".")[0]][
                this.initResLevel.split(".")[1]
              ]
            : res[this.initResLevel];

          // 解决回显问题：通过splice去掉重复数据
          if (this.multiple) {
            // 多选
            this.selfValue.map(id => {
              const index = initResData.findIndex(
                i => i[this.optionValue] == id
              );
              // 找到了
              if (index !== -1) {
                initResData.splice(index, 1);
              }
            });
          } else {
            // 单选
            const index = initResData.findIndex(
              i => i[this.optionValue] == this.selfValue
            );
            // 找到了
            if (index !== -1) {
              initResData.splice(index, 1);
            }
          }

          // 将数据推入数组
          for (let i = 0; i < initResData.length; i++) {
            const element = initResData[i];
            this.selfOptions.push(element);
          }

          // 关闭懒加载遮罩层
          l.close();
        }
      });
    },

    /* change */
    onChange(v) {
      if (this.isForamattable) {
        this.$emit("change", v.join(this.valueFormat));
      } else {
        this.$emit("change", v);
      }
    },

    /* visible change */
    onVisibleChange(v) {
      if (!v) {
        this.queryParams = {
          [this.optionLabel]: "",
          pageNum: 1,
          pageSize: 10
        };
        this.init();
      }
      this.$emit("visible-change", v);
    },

    /* remove tag */
    onRemoveTag(v) {
      this.$emit("remove-tag", v);
    },

    /* clear */
    onClear() {
      this.queryParams = {
        [this.optionLabel]: "",
        pageNum: 1,
        pageSize: 10
      };
      this.init();
      this.$emit("clear");
    },

    /* blur */
    onBlur(e) {
      this.$emit("blur", e);
    },

    /* focus */
    onFocus(e) {
      this.$emit("focus", e);
    },

    /* draggable */
    onDraggable() {
      const el = this.$refs.wSelect.$el.querySelectorAll(
        ".el-select__tags > span"
      )[0];

      Sortable.create(el, {
        animation: 180,
        delay: 0,
        ghostClass: "sortable-ghost",
        setData: function(dataTransfer) {
          dataTransfer.setData("Text", "");
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          const target = this.selectedValue.splice(evt.oldIndex, 1)[0];
          this.selectedValue.splice(evt.newIndex, 0, target);

          if (this.isForamattable) {
            this.$emit("change", this.selectedValue.join(this.valueFormat));
          } else {
            this.$emit("change", this.selectedValue);
          }
        }
      });
    },

    /* value 值判断 */
    onValueType(v) {
      if (this.multiple) {
        if (this.valueType === "number") {
          return v.map(Number);
        }

        if (this.valueType === "string") {
          return v.map(String);
        }
      } else {
        if (this.valueType === "number") {
          return Number(v);
        }

        if (this.valueType === "string") {
          return String(v);
        }
      }
    }
  },

  created() {},

  mounted() {
    this.init();
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

<style lang="scss" scoped>
.drag-select {
  ::v-deep {
    .sortable-ghost {
      opacity: 0.8;
      color: #fff !important;
      background: #42b983 !important;
    }

    .el-tag {
      cursor: pointer;
    }
  }
}
</style>