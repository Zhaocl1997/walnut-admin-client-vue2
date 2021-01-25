'use strict'

import { ElTag } from 'element-plus'

export const wTagProps = {
  /**
   * @description ElTag original props
   */
  ...ElTag.props,

  /**
   * @description v-model
   * @type {[Array, Boolean, String]}
   */
  modelValue: [Array, Boolean, String],

  /**
   * @description options for el-option
   * @type {Array}
   * @default []
   */
  options: { type: Array, default: () => [] },

  /**
   * @description options value field
   * @type {String}
   * @default value
   */
  optionValue: { type: String, default: 'value' },

  /**
   * @description options label field
   * @type {String}
   * @default label
   */
  optionLabel: { type: String, default: 'label' },

  /**
   * @description specfic a field for value/label same
   * @type {String}
   */
  valueKey: String,

  /**
   * @description show add button or not
   * @type {Boolean}
   * @default false
   */
  addable: { type: Boolean, default: false },

  /**
   * @description value should be unique or not
   * @type {Boolean}
   * @default false
   */
  unique: { type: Boolean, default: false },
}
