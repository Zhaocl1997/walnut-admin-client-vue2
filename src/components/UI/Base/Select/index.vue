<template>
  <el-select
    ref="wSelect"
    class="w-select"
    v-model="selectedValue"
    v-loadmore="loadmore"
    :multiple="multiple"
    :disabled="disabled"
    :valueKey="valueKey"
    :size="size"
    :clearable="clearable"
    :collapseTags="collapse"
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
    :popper-class="selfPopperClass"
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
    <el-option
      v-for="item in selfOptions"
      :key="item[optionValue]"
      :label="item[optionLabel]"
      :value="valueKey ? item :item[optionValue]"
      :disabled="item.disabled || item[optionValue] == selfPopperClass"
    ></el-option>
  </el-select>
</template>

<script>
import Sortable from "sortablejs";
import BlockMixins from "../utils/mixins/block";
import {
  isEmpty,
  randomId,
  deepClone,
  objectArrayUnique
} from "easy-fns/lib/utils";
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
      count: 0,

      selfLoading: this.loading,
      selfOptions: this.options,

      queryParams: {
        [this.optionLabel]: "",
        pageNum: this.pageNum,
        pageSize: this.pageSize
      },

      selectedValue: undefined
    };
  },

  computed: {
    selfId() {
      return randomId(16);
    },

    selfPopperClass() {
      return this.popperClass ? this.popperClass : `id-${this.selfId}`;
    },

    selfRemoteMethod() {
      return this.remoteMethod ? this.remoteMethod : this.onRemoteSearch;
    },

    selfQueryParams() {
      return {
        ...this.queryParams,
        ...this.query
      };
    },

    isForamattable() {
      return (
        this.multiple &&
        !isEmpty(this.selectedValue) &&
        !isEmpty(this.valueFormat) &&
        isEmpty(this.valueKey)
      );
    },

    isRemoteable() {
      return !isEmpty(this.initFunc) && !isEmpty(this.getFunc) && this.remote;
    },

    isDraggable() {
      return this.multiple && this.draggable && !this.collapse;
    }
  },

  watch: {
    value(newV, oldV) {
      this.onFormatValue();
    }

    // options(newV, oldV) {
    //   if (!isEmpty(newV) && newV != oldV) {
    //     this.selfOptions = newV;
    //   }
    // }
  },

  props: {
    // origin
    value: [String, Number, Array, Boolean, Object],
    multiple: Boolean,
    disabled: Boolean,
    valueKey: String,
    size: String,
    clearable: Boolean,
    collapse: Boolean,
    multipleLimit: Number,
    placeholder: String,
    filterable: Boolean,
    allowCreate: Boolean,
    filterMethod: Function,
    remote: Boolean,
    remoteMethod: Function,
    loading: Boolean,
    loadingText: { type: String, default: "正在加载世界..." },
    noMatchText: { type: String, default: "这个世界并没有您想要的东西..." },
    noDataText: { type: String, default: "一片虚无..." },
    popperClass: String,
    reserveKeyword: Boolean,
    defaultFirstOption: Boolean,
    popperAppendToBody: { type: Boolean, default: true },
    automaticDropdown: Boolean,

    // custom
    query: Object,

    pageNum: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },

    valueFormat: String,
    valueType: { type: String, default: "string" },

    tooltip: Boolean,
    draggable: Boolean,

    options: { type: Array, default: () => [] },
    optionLabel: { type: String, default: "label" },
    optionValue: { type: String, default: "value" },

    initFunc: Function,
    getFunc: Function,

    initResLevel: { type: String, default: "rows" },
    getResLevel: { type: String, default: "data" },

    endText: { type: String, default: "已经到世界尽头了..." }
  },

  methods: {
    init() {
      this.onDraggable();

      this.onFormatValue();

      this.onGetRemoteOptions();
    },

    async onGetRemoteOptions(needFeedback = true, needResetQuery = false) {
      if (!this.isRemoteable) {
        return;
      }

      this.selfLoading = true;

      if (needResetQuery) {
        this.onResetQuery();
      }

      const res = await this.initFunc(this.selfQueryParams);
      this.selfOptions = this.onResponseLevel(res, "initResLevel");
      this.selfLoading = false;

      if (needFeedback) {
        this.feedBack();
      }
    },

    async feedBack() {
      if (isEmpty(this.selectedValue)) {
        return;
      }

      if (!isArray(this.selectedValue)) {
        await this.getData(this.selectedValue);
      } else {
        const promises = await this.selectedValue.map(
          async i => await this.getData(i)
        );
        await Promise.all(promises);
      }
    },

    async getData(value) {
      const index = this.selfOptions.findIndex(
        i => i[this.optionValue] == value
      );

      if (index === -1) {
        const res = await this.getFunc(value);
        const getResData = this.onResponseLevel(res, "getResLevel");

        if (res.code === 200 && getResData) {
          this.selfOptions.unshift({
            [this.optionValue]: value,
            [this.optionLabel]: getResData[this.optionLabel]
          });
        }
      }
    },

    async onRemoteSearch(query) {
      if (!isEmpty(query)) {
        this.queryParams[this.optionLabel] = query;
        this.onGetRemoteOptions(false, false);
      }
    },

    async loadmore() {
      if (!this.isRemoteable) {
        return;
      }

      const l = this.openLoading(`.${this.selfPopperClass}`);

      this.queryParams.pageNum += 1;

      const res = await this.initFunc(this.selfQueryParams);

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
                [this.optionValue]: this.selfPopperClass,
                [this.optionLabel]: this.endText
              });
            }

            l.close();
            return;
          }
        }

        const initResData = this.onResponseLevel(res, "initResLevel");

        this.selfOptions = objectArrayUnique(
          [...this.selfOptions, ...initResData],
          this.optionValue
        );

        l.close();
      }
    },

    onChange(v) {
      this.onValueChange(v);
    },

    onVisibleChange(visible) {
      if (!visible) {
        this.onGetRemoteOptions(true, true);
      }
      this.$emit("visible-change", visible);
    },

    onRemoveTag(v) {
      this.$emit("remove-tag", v);
    },

    onClear() {
      this.onGetRemoteOptions(true, true);
      this.$emit("clear");
    },

    onBlur(e) {
      this.$emit("blur", e);
    },

    onFocus(e) {
      this.$emit("focus", e);
    },

    onDraggable() {
      if (!this.isDraggable) {
        return;
      }

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

          this.onValueChange(this.selectedValue);
        }
      });
    },

    onResetQuery() {
      this.queryParams = {
        [this.optionLabel]: "",
        pageNum: 1,
        pageSize: 10
      };
    },

    onResponseLevel(res, resType) {
      return this[resType].includes(".")
        ? res[this[resType].split(".")[0]][this[resType].split(".")[1]]
        : res[this[resType]];
    },

    onFormatValue() {
      if (this.isForamattable) {
        this.selectedValue = this.onValueType(
          this.value.split(this.valueFormat)
        );
      } else {
        this.selectedValue = this.value;
      }

      if (isEmpty(this.value)) {
        if (this.multiple) {
          this.selectedValue = [];
        } else {
          this.selectedValue = "";
        }
      }
    },

    onValueChange(value) {
      if (this.isForamattable) {
        this.$emit("change", value.join(this.valueFormat));
      } else {
        this.$emit("change", value);
      }
    },

    onValueType(value) {
      if (this.multiple) {
        if (this.valueType === "number") {
          return value.map(Number);
        }

        if (this.valueType === "string") {
          return value.map(String);
        }
      } else {
        if (this.valueType === "number") {
          return Number(value);
        }

        if (this.valueType === "string") {
          return String(value);
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
.w-select {
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