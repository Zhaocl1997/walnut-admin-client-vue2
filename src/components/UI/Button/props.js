'use strict'

import { ElButton } from 'element-plus'

export const wButtonProps = {
  /**
   * @description ElButton original props
   */
  ...ElButton.props,

  /**
   * @description prefix icon
   */
  prefixIcon: String,

  /**
   * @description suffix icon
   */
  suffixIcon: String,

  /**
   * @description retry delay for second
   */
  retryDelay: [String, Number],

  /**
   * @description load delay for second
   */
  loadDelay: [String, Number],

  /**
   * @description block mode
   */
  block: Boolean,

  /**
   * @description text for prop
   */
  text: String,
}
