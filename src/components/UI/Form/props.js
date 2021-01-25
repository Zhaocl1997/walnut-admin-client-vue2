'use strict'

import { ElForm } from 'element-plus'

export const wFormProps = {
  /**
   * @description original ElForm props
   */
  ...ElForm.props,

  /**
   * @description form model to render relevant component
   * @type {Array}
   */
  schema: Array,

  /**
   * @description v-model value for form
   * @type {Object}
   */
  modelValue: Object,

  /**
   * @override
   * @description override original labelWidth with a default value
   * @type {String}
   * @default 0
   */
  labelWidth: {
    type: String,
    default: '0',
  },

  /**
   * @description form item gutter provided by el-row
   * @type {Number}
   * @default 0
   */
  gutter: {
    type: Number,
    default: 0,
  },

  /**
   * @description form item span provided by el-col
   * @type {Number}
   * @default 24
   */
  span: {
    type: Number,
    default: 24,
  },

  /**
   * @description show fold button or not
   * @type {Boolean}
   * @default false
   */
  fold: {
    type: Boolean,
    default: false,
  },

  /**
   * @description default fold or not
   * @type {Boolean}
   * @default false
   */
  defaultFold: {
    type: Boolean,
    default: false,
  },

  /**
   * @description count to fold form items
   * @type {Number}
   * @default 0
   */
  countToFold: {
    type: Number,
    default: 0,
  },

  /**
   * @description form mock button, use mockjs
   * @type {Boolean}
   * @default false
   */
  mock: {
    type: Boolean,
    default: false,
  },

  /**
   * @description scoped mock button, specify item with `mock: true`
   * @type {Boolean}
   * @default false
   */
  scopedMock: {
    type: Boolean,
    default: false,
  },

  /**
   * @description query button, for search form use
   * @type {Boolean}
   * @default false
   */
  query: {
    type: Boolean,
    default: false,
  },

  /**
   * @description reset button, for search form use
   * @type {Boolean}
   * @default false
   */
  reset: {
    type: Boolean,
    default: false,
  },

  /**
   * @description print button
   * @type {Boolean}
   * @default false
   */
  print: {
    type: Boolean,
    default: false,
  },

  /**
   * @description prettier display
   * @type {Boolean}
   * @default false
   */
  prettier: {
    type: Boolean,
    default: false,
  },
}
