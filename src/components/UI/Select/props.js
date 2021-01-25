'use strict'

import { ElSelect } from 'element-plus'

export const wSelectProps = {
  /**
   * @description ElSelect original props
   */
  ...ElSelect.props,

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
   * @override
   * @type {String}
   */
  valueKey: String,
}
