'use strict'

import { ElForm } from 'element-plus'

export const originalProps = {
  /**
   * @description original ElForm props
   */
  ...ElForm.props,

  /**
   * @override
   * @description override original labelWidth with a default value
   * @type {String}
   * @default auto
   */
  labelWidth: {
    type: String,
    default: 'auto',
  },
}

export const extendProps = {
  /**
   * @description form model to render relevant component
   * @type {Array}
   */
  schemas: {
    type: Array,
    default: () => {
      return []
    },
    required: true,
  },

  /**
   * @description v-model value for form
   * @type {Object}
   */
  modelValue: {
    type: Object,
    default: () => {
      return {}
    },
    required: true,
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
   * @default 3
   */
  countToFold: {
    type: Number,
    default: 3,
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
   * @description query group button
   * @type {Boolean}
   * @default false
   */
  query: {
    type: Boolean,
    default: false,
  },

  /**
   * @description compact form
   * @type {Boolean}
   * @default false
   */
  compact: {
    type: Boolean,
    default: false,
  },
}

export default {
  ...originalProps,
  ...extendProps,
}
