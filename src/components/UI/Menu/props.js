'use strict'

import { ElMenu } from 'element-plus'

export const wMenuProps = {
  /**
   * @description original ElTable props
   */
  ...ElMenu.props,

  modelValue: [String, Number],

  options: {
    type: Array,
    default: () => [],
  },
}
