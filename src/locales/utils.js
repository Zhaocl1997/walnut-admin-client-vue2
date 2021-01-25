'use strict'

import { set } from 'lodash-es'
import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'

const modules = import.meta.globEager('./lang/**/*.js')

function genMessage(langs) {
  const obj = {}

  Object.keys(langs).forEach((key) => {
    const mod = langs[key].default
    let k = key.replace(`./lang/`, '').replace(/^\.\//, '')
    const lastIndex = k.lastIndexOf('.')
    k = k.substring(0, lastIndex)
    const keyList = k.split('/')
    const lang = keyList.shift()
    const objKey = keyList.join('.')
    if (lang) {
      set(obj, lang, obj[lang] || {})
      set(obj[lang], objKey, mod)
    }
  })

  set(obj, 'en.el', enLocale.el)
  set(obj, 'zh_CN.el', zhLocale.el)

  return obj
}

export default genMessage(modules)
