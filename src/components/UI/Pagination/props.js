'use strict'

import { ElPagination } from 'element-plus'

export const wPaginationProps = {
  /**
   * @description ElPagination original props
   */
  ...ElPagination.props,

  /**
   * @description auto scroll animation
   * @type {Boolean}
   * @default true
   */
  autoScroll: { type: Boolean, default: true },

  /**
   * @override
   * @type {Boolean}
   * @default true
   */
  background: { type: Boolean, default: true },

  /**
   * @override
   * @type {String}
   */
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper, slot',
  },
}
