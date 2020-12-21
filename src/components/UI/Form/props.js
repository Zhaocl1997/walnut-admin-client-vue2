'use strict'

import { ElForm } from 'element-plus'

export const wFormProps = {
  /**
   * @description original ElForm props
   */
  ...ElForm.props,

  /**
   * @description form model to render relevant component
   */
  model: Array,

  /**
   * @description v-model value for form
   */
  modelValue: Object,

  /**
   * @description override original labelWidth with a default value
   * @default 60px
   */
  labelWidth: {
    type: String,
    default: '60px',
  },

  /**
   * @description form item gutter
   * @default 0
   */
  gutter: {
    type: Number,
    default: 0,
  },

  /**
   * @description form item span
   * @default 24
   */
  span: {
    type: Number,
    default: 24,
  },
}
