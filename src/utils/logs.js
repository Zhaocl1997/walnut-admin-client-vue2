
'use strict'

import variables from '@/assets/styles/vendors/_element.scss'
import { THEME_TYPE } from './constant'

const log = {}

/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | info ]
 */
function typeColor(type = THEME_TYPE.PRIMARY) {
    let color = ''
    switch (type) {
        case THEME_TYPE.PRIMARY:
            color = variables.primary
            break
        case THEME_TYPE.SUCCESS:
            color = variables.success
            break
        case THEME_TYPE.WARNING:
            color = variables.warning
            break
        case THEME_TYPE.DANGER:
            color = variables.danger
            break
        case THEME_TYPE.INFO:
            color = variables.info
            break
        default:
            break
    }
    return color
}

/**
 * @description 打印一个 [ title | text ] 样式的信息
 * @param {String} title title text
 * @param {String} info info text
 * @param {String} type style
 */
log.capsule = function (title, info, type = THEME_TYPE.PRIMARY) {
    console.log(
        `%c ${title} %c ${info} %c`,
        'background: #35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
        `background: ${typeColor(type)}; padding: 1px; border-radius: 0 3px 3px 0; color: #fff;`,
        'background: transparent'
    )
}

/**
 * @description 打印彩色文字
 */
log.colorful = function (textArr) {
    console.log(
        `%c${textArr.map(t => t.text || '').join('%c')}`,
        ...textArr.map(t => `color: ${typeColor(t.type)};`)
    )
}

/**
 * @description 打印 primary 样式的文字
 */
log.primary = function (text) {
    log.colorful([{ text, type: THEME_TYPE.PRIMARY }])
}

/**
 * @description 打印 success 样式的文字
 */
log.success = function (text) {
    log.colorful([{ text, type: THEME_TYPE.SUCCESS }])
}

/**
 * @description 打印 warning 样式的文字
 */
log.warning = function (text) {
    log.colorful([{ text, type: THEME_TYPE.WARNING }])
}

/**
 * @description 打印 danger 样式的文字
 */
log.danger = function (text) {
    log.colorful([{ text, type: THEME_TYPE.DANGER }])
}

/**
 * @description 打印 danger 样式的文字
 */
log.info = function (text) {
    log.colorful([{ text, type: THEME_TYPE.INFO }])
}

export default log