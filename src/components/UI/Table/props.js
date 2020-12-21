'use strict'

import { ElTable } from 'element-plus'

export const wTableProps = {
  /**
   * @description original ElTable props
   */
  ...ElTable.props,

  /**
   * @description v-model value ,for single or multiple
   */
  modelValue: [Array, Object],

  /**
   * @description v-model:headers value, for table header columns
   */
  headers: Array,

  /**
   * @description v-model:pageNum value, for pagination currentPage
   * @default 1
   */
  pageNum: { type: Number, default: 1 },

  /**
   * @description v-model:pageSize value, for pagination pageSize
   * @default 10
   */
  pageSize: { type: Number, default: 10 },

  /**
   * @description has select column or not
   * @default false
   */
  hasSelect: { type: Boolean, default: false },

  /**
   * @description has index column or not
   * @default false
   */
  hasIndex: { type: Boolean, default: false },

  /**
   * @description has expand column or not
   * @default false
   */
  hasExpand: { type: Boolean, default: false },

  /**
   * @description show settings or not
   * @default false
   */
  showSettings: { type: Boolean, default: false },

  /**
   * @description show pagination or not
   * @default false
   */
  showPage: { type: Boolean, default: false },

  /**
   * @description able to use v-model for single choose
   * @default false
   */
  single: { type: Boolean, default: false },

  /**
   * @description able to use v-model for multiple selections
   * @default false
   */
  multiple: { type: Boolean, default: false },

  /**
   * @description select column able/enable function
   */
  selectable: Function,

  /**
   * @description reserve multiple select or not
   * @default false
   */
  reserveSelection: { type: Boolean, default: false },

  /**
   * @description total for pagination use
   */
  total: Number,

  /**
   * @description get table data method, for settings-refresh use
   */
  listFunc: Function,
}
