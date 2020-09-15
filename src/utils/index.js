
/* eslint-disable */
'use strict'

import { REGEX, ALL_STRING } from './constant'

const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)
export const isArray = isType('Array')
const isObject = isType('Object')
// const isNumber = isType('Number')
const isString = isType('String')

export const commonUsed = [
    {
        id: REGEX.ID,
        info: "身份证号"
    },
    {
        phone: REGEX.PHONE,
        info: "手机号"
    },
    {
        email: REGEX.EMAIL,
        info: "邮箱地址"
    }
]

export const clearIllegalChars = (str, arr) => {
    let newStr = ""
    for (let i = 0; i < arr.length; i++) {
        // 找到了
        if (str.indexOf(arr[i]) != -1) {
            let regexp = "/\\" + arr[i] + "/g"
            str = str.replace(eval(regexp), "")
        }
    }
    newStr = str
    return newStr
}

export const clearUnexpectedChars = (val, type) => {
    if (!val || !isString(type)) {
        return val
    }

    const allowedInputType = ["number", "letter", "chinese"]

    if (!allowedInputType.includes(type)) {
        return val
    }

    const reverseRegex = v => "/" + v + "/g"
    const regexTemplate = {
        number: '[^0-9-.]',
        letter: '[^A-Za-z]',
        chinese: '[^\u4e00-\u9fa5]',
    }

    return val.replace(eval(reverseRegex(regexTemplate[type])), "")
}

export const checkStrong = (val) => {
    if (!val) return
    let modes = 0
    // 正则表达式验证符合要求的
    if (val.length < 1) return modes
    if (/\d/.test(val)) modes++ // 数字
    if (/[a-z]/.test(val)) modes++ // 小写
    if (/[A-Z]/.test(val)) modes++ // 大写
    if (/\W/.test(val)) modes++ // 特殊字符
    //逻辑处理
    switch (modes) {
        case 1:
            return 1
        case 2:
            return 1
        case 3:
            return 2
        case 4:
            return 3
    }
    return modes
}

export const randomId = (len = 32) => {
    const $chars = ALL_STRING
    let pwd = ""
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * $chars.length))
    }
    return pwd
}

// 判断内容是否为空
export const isEmpty = (val) => {
    // null or undefined
    if (val === null || val === undefined) return true

    if (typeof val === 'boolean') return false

    if (typeof val === 'number') return !val

    if (val instanceof Error) return val.message === ''

    switch (Object.prototype.toString.call(val)) {
        // String or Array
        case '[object String]':
        case '[object Array]':
            return !val.length

        // Map or Set or File
        case '[object File]':
        case '[object Map]':
        case '[object Set]': {
            return !val.size
        }

        // Plain Object
        case '[object Object]': {
            return !Object.keys(val).length
        }
    }
    return false
}

export const deepClone = target => {
    if (isObject(target)) {
        let cloneTarget = isArray(target) ? [] : {}
        for (const key in target) {
            cloneTarget[key] = deepClone(target[key])
        }
        return cloneTarget
    } else {
        return target
    }
}