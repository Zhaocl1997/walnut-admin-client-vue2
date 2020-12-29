'use strict'

import { ElTree } from 'element-plus'

export const wTreeProps = {
  ...ElTree.props,

  modelValue: [String, Number, Array],

  multiple: {
    type: Boolean,
    default: false,
  },

  highlightCurrent: {
    type: Boolean,
    default: true,
  },

  expandOnClickNode: {
    type: Boolean,
    default: false,
  },

  leafOnly: {
    type: Boolean,
    default: false,
  },

  includeHalfChecked: {
    type: Boolean,
    default: false,
  },
}
