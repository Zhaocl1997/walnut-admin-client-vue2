'use strict'

import { ElTree } from 'element-plus'

export const wTreeProps = {
  /**
   * @description original ElTree props
   */
  ...ElTree.props,

  /**
   * @override
   * @type {Boolean}
   * @default true
   */
  highlightCurrent: {
    type: Boolean,
    default: true,
  },

  /**
   * @override
   * @type {Boolean}
   * @default false
   */
  expandOnClickNode: {
    type: Boolean,
    default: false,
  },

  /**
   * @description v-model
   */
  modelValue: [String, Number, Array],

  /**
   * @description multiple, also means for original show-checkbox
   * @type {Boolean}
   * @default false
   */
  multiple: {
    type: Boolean,
    default: false,
  },

  /**
   * @description used for multiple change, if only need leaf node, default false
   * @type {Boolean}
   * @default false
   */
  leafOnly: {
    type: Boolean,
    default: false,
  },

  /**
   * @description used for multiple change, if include half checked node, default false
   * @type {Boolean}
   * @default false
   */
  includeHalfChecked: {
    type: Boolean,
    default: false,
  },
}
