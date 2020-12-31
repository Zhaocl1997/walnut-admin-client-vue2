'use strict'

import { ElDropdown } from 'element-plus'

export const wDropdownProps = {
  /**
   * @description original ElDropdown props
   */
  ...ElDropdown.props,

  modelValue: {
    type: [String, Number],
    default: '',
  },

  options: {
    type: Array,
    default: () => [],
  },
}
