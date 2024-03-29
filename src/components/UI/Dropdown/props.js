'use strict'

import { ElDropdown } from 'element-plus'

export const wDropdownProps = {
  /**
   * @description original ElDropdown props
   */
  ...ElDropdown.props,

  /**
   * @description v-model
   * @type {[String, Number]}
   */
  modelValue: [String, Number],

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
}
