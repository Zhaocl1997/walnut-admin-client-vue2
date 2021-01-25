'use strict'

import { ElCheckboxGroup } from 'element-plus'

export const wCheckboxProps = {
  /**
   * @description ElCheckboxGroup original props
   */
  ...ElCheckboxGroup.props,

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
   * @description value to format for multiple select
   * @example value-format="," => v-model will be a string split by `,`
   * @type {String}
   */
  valueFormat: String,

  /**
   * @description define the typeof option value, only can pass `number` or `string`
   * @type {String}
   * @default string
   */
  valueType: { type: String, default: 'string' },

  /**
   * @description fit for same style API,
   * @type {Boolean}
   * @default false
   */
  multiple: Boolean,

  /**
   * @description text shown when used for true/false case, used for wForm `schema`
   * @type {String}
   */
  text: String,

  /**
   * @description override original modelValue
   * @type {[Object, Array, Boolean, String]}
   */
  modelValue: [Object, Array, Boolean, String],
}
