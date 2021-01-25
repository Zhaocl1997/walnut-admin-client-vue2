'use strict'

import { ElRadioGroup } from 'element-plus'

export const wRadioProps = {
  /**
   * @description ElRadioGroup original props
   */
  ...ElRadioGroup.props,

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
   * @description button type or not
   * @type {Boolean}
   * @default false
   */
  button: { type: Boolean, default: false },

  /**
   * @description border type or not
   * @type {Boolean}
   * @default false
   */
  border: { type: Boolean, default: false },
}
