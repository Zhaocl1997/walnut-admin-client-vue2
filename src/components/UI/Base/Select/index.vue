<template>
  <div class="w-select">
    <el-select
      ref="wSelect"
      v-model="customValue"
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
        :value="valueKey ? item : item[optionValue]"
        :disabled="item.disabled || item[optionValue] == selfPopperClass"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import Sortable from "sortablejs";

import { isEmpty } from "easy-fns/lib/utils";
import { objectArrayUnique } from "easy-fns/lib/array";
import { isArray } from "easy-fns/lib/type";
import { genString } from "easy-fns/lib/generator";

import BlockMixins from "../utils/mixins/block";
import ValueFormatMixins from "../utils/mixins/value-format";

export default {
  name: "wSelect",

  components: {},

  mixins: [BlockMixins(), ValueFormatMixins([], "")],

  model: {
    event: "",
    prop: "",
  },

  data() {
    return {
      count: 0,

      selfLoading: this.loading,
      selfOptions: this.options,

      queryParams: {
        [this.optionLabel]: "",
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      },
    };
  },

  computed: {
    selfId() {
      return genString(16);
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
        ...this.query,
      };
    },

    isForamattable() {
      return (
        this.multiple && !isEmpty(this.valueFormat) && isEmpty(this.valueKey)
      );
    },

    isRemoteable() {
      return !isEmpty(this.initFunc) && !isEmpty(this.getFunc) && this.remote;
    },

    isDraggable() {
      return this.multiple && this.draggable && !this.collapse;
    },
  },

  watch: {
    value() {
      this.onInitCustomValue();
    },

    options(newV, oldV) {
      if (!isEmpty(newV) && newV != oldV) {
        this.selfOptions = newV;
      }
    },
  },

  props: {
    // origin
    value: [Array, String, Number, Boolean, Object],
    // multiple: Boolean,
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
    noDataText: { type: String, default: "这个世界一片虚无..." },
    popperClass: String,
    reserveKeyword: Boolean,
    defaultFirstOption: Boolean,
    popperAppendToBody: { type: Boolean, default: true },
    automaticDropdown: Boolean,

    // custom
    query: Object,

    pageNum: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },

    tooltip: Boolean,
    draggable: Boolean,

    initFunc: Function,
    getFunc: Function,

    initResLevel: { type: String, default: "rows" },
    getResLevel: { type: String, default: "data" },

    endText: { type: String, default: "已经到世界尽头了..." },
  },

  methods: {
    init() {
      this.onInitCustomValue();

      this.onGetRemoteOptions();

      setTimeout(() => {
        this.onDraggable();
      }, 1000);
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
      if (isEmpty(this.customValue)) {
        return;
      }

      if (!isArray(this.customValue)) {
        await this.getData(this.customValue);
      } else {
        const promises = await this.customValue.map(
          async (i) => await this.getData(i)
        );
        await Promise.all(promises);
      }
    },

    async getData(value) {
      const index = this.selfOptions.findIndex(
        (i) => i[this.optionValue] == value
      );

      if (index === -1) {
        const res = await this.getFunc(value);
        const getResData = this.onResponseLevel(res, "getResLevel");

        if (res.code === 200 && getResData) {
          this.selfOptions.unshift({
            [this.optionValue]: value,
            [this.optionLabel]: getResData[this.optionLabel],
          });
        }
      }
    },

    async onRemoteSearch(query) {
      if (!isEmpty(query) && this.filterable) {
        this.queryParams[this.optionLabel] = query;
        this.onGetRemoteOptions(false, false);
      }
    },

    async loadmore() {
      if (!this.isRemoteable) {
        return;
      }

      if (
        this.selfOptions.find(
          (i) => i[this.optionValue] == this.selfPopperClass
        )
      ) {
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
                [this.optionLabel]: this.endText,
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
      this.$emit("change", v);
    },

    onVisibleChange(visible) {
      if (!visible && !this.valueKey) {
        this.onGetRemoteOptions(true, true);
      }
      this.$emit("visible-change", visible);
      this.count = 0;
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
        setData: function (dataTransfer) {
          dataTransfer.setData("Text", "");
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: (evt) => {
          const target = this.customValue.splice(evt.oldIndex, 1)[0];
          this.customValue.splice(evt.newIndex, 0, target);

          this.onValueChange(this.customValue);
        },
      });
    },

    onResetQuery() {
      this.queryParams = {
        [this.optionLabel]: "",
        pageNum: 1,
        pageSize: 10,
      };
    },

    onResponseLevel(res, resType) {
      return this[resType].includes(".")
        ? res[this[resType].split(".")[0]][this[resType].split(".")[1]]
        : res[this[resType]];
    },
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

  activated() {},
};
</script>

<style lang="scss">
/* 👆👆 上面不要加scoped! 👆👆 */
/* 以下均是修复多选状态下的样式 */
/* ========================== */
/* 解决多选时label过长 tag也过长的问题 */
/* tag 最大宽度 120px */
.el-select__tags-text {
  display: inline-block;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-select .el-tag__close.el-icon-close {
  top: -7px;
}

/* 解决label过长 dropdown也过长的问题 */
/* option label 最大宽度 400px */
.el-select-dropdown {
  max-width: 400px;
}

/* 如果label过长时，希望在下拉框中换行，可以打开以下注释 */
/* .el-select-dropdown__item {
  height: auto !important;
  white-space: normal !important;
} */

/* 如果希望多选时内容多，但是tag不会把select高度撑开，可以打开以下注释 */
/* .el-select__tags {
  flex-wrap: inherit;
  overflow: auto;

  &::-webkit-scrollbar-track-piece {
    background: #d3dce6;
  }

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #99a9bf;
    border-radius: 20px;
  }
} */
</style>
