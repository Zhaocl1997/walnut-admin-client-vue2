'use strict'

import { useI18n } from '/@/hooks/useI18n.js'
import { ElNotification } from 'element-plus'

const error = (m) => {
  ElNotification.error({
    title: m,
  })
}

export const checkStatus = (status, msg) => {
  const { t } = useI18n()

  switch (status) {
    case 400:
      error(`${msg}`)
      break

    // 401: 未登录
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401:
      error(t('system.api.errMsg401'))
      // userStore.loginOut(true);
      break

    case 403:
      error(t('system.api.errMsg403'))
      break

    // 404请求不存在
    case 404:
      error(t('system.api.errMsg404'))
      break

    case 405:
      error(t('system.api.errMsg405'))
      break

    case 408:
      error(t('system.api.errMsg408'))
      break

    case 500:
      error(t('system.api.errMsg500'))
      break

    case 501:
      error(t('system.api.errMsg501'))
      break

    case 502:
      error(t('system.api.errMsg502'))
      break

    case 503:
      error(t('system.api.errMsg503'))
      break

    case 504:
      error(t('system.api.errMsg504'))
      break

    case 505:
      error(t('system.api.errMsg505'))
      break

    default:
      break
  }
}
