'use strict'

import { ElDialog } from 'element-plus'

export const wDialogProps = {
  /**
   * @description original ElDialog props
   */
  ...ElDialog.props,

  /**
   * @description dialog header
   * @type {Boolean}
   * @default true
   */
  header: {
    type: Boolean,
    default: true,
  },

  /**
   * @description dialog footer
   * @type {Boolean}
   * @default true
   */
  footer: {
    type: Boolean,
    default: true,
  },

  /**
   * @description line
   * @type {Boolean}
   * @default true
   */
  line: {
    type: Boolean,
    default: true,
  },

  /**
   * @override
   * @type {String}
   * @default 6vh
   */
  top: {
    type: String,
    default: '6vh',
  },
}
