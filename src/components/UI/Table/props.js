'use strict'

import { ElTable } from 'element-plus'

export default {
  /**
   * @description original ElTable props
   */
  ...ElTable.props,

  /**
   * @description v-model value ,for single or multiple
   * @type {Array, Object}
   */
  modelValue: [Array, Object],

  /**
   * @description table title
   * @type {String}
   */
  title: String,

  /**
   * @description index column index function
   * @type {Function}
   */
  index: Function,

  /**
   * @description v-model:headers value, for table header columns
   * @type {Array}
   */
  headers: Array,

  /**
   * @description v-model:pageNum value, for pagination currentPage
   * @type {Number}
   * @default 1
   */
  pageNum: {
    type: Number,
    default: 1,
  },

  /**
   * @description v-model:pageSize value, for pagination pageSize
   * @type {Number}
   * @default 10
   */
  pageSize: {
    type: Number,
    default: 10,
  },

  /**
   * @description has select column or not
   * @type {Boolean}
   * @default false
   */
  hasSelect: {
    type: Boolean,
    default: false,
  },

  /**
   * @description has index column or not
   * @type {Boolean}
   * @default false
   */
  hasIndex: {
    type: Boolean,
    default: false,
  },

  /**
   * @description has expand column or not
   * @type {Boolean}
   * @default false
   */
  hasExpand: {
    type: Boolean,
    default: false,
  },

  /**
   * @description has action column or not
   * @type {Boolean}
   * @default false
   */
  hasAction: {
    type: Boolean,
    default: false,
  },

  /**
   * @description show title or not
   * @type {Boolean}
   * @default false
   */
  hasTitle: {
    type: Boolean,
    default: false,
  },

  /**
   * @description show settings or not
   * @type {Boolean}
   * @default false
   */
  hasSettings: {
    type: Boolean,
    default: false,
  },

  /**
   * @description show pagination or not
   * @type {Boolean}
   * @default false
   */
  hasPage: {
    type: Boolean,
    default: false,
  },

  /**
   * @description able to use v-model for single choose
   * @type {Boolean}
   * @default false
   */
  single: {
    type: Boolean,
    default: false,
  },

  /**
   * @description able to use v-model for multiple selections
   * @type {Boolean}
   * @default false
   */
  multiple: {
    type: Boolean,
    default: false,
  },

  /**
   * @description select column able/enable function
   * @type {Function}
   */
  selectable: Function,

  /**
   * @description reserve multiple select or not
   * @type {Boolean}
   * @default false
   */
  reserveSelection: {
    type: Boolean,
    default: false,
  },

  /**
   * @description total for pagination use
   * @type {Number}
   */
  total: Number,

  /**
   * @description table loading using skeleton
   * @type {Boolean}
   */
  loading: {
    type: Boolean,
    default: false,
  },

  /**
   * =======================================
   * =======================================
   * ============ Title / Help =============
   * =======================================
   * =======================================
   */

  /**
   * @description title content
   * @type {String}
   */
  tableTitle: String,

  /**
   * @description help message content
   * @type {String}
   */
  tableHelp: String,

  /**
   * =======================================
   * =======================================
   * ============ State / Empty ============
   * =======================================
   * =======================================
   */

  /**
   * @description description when no data
   * @type {String}
   */
  description: String,

  /**
   * @description image uri to display
   * @type {String}
   */
  image: String,

  /**
   * @description image size
   * @type {Number}
   */
  imageSize: Number,

  /**
   * =======================================
   * =======================================
   * ========== State / Loading ============
   * =======================================
   * =======================================
   */

  /**
   * @description loading type, only support for ['default', 'skeleton'] two types
   * @type {String}
   * @default loading
   */
  loadingType: { type: String, default: 'default' },

  /**
   * =======================================
   * =======================================
   * ================ api  =================
   * =======================================
   * =======================================
   */

  /**
   * @description api list function
   * @type {Function}
   */
  apiFn: Function,
}
