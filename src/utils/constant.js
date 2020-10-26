
'use strict'


export const TABLE_COL_TYPE = {
    LEFT: 'left',
    COMMON: 'common',
    RIGHT: 'right'
}

export const REGEX = {
    EMAIL: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    PHONE: /^1[3456789]\d{9}$/,
    ID: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
}

export const THEME_TYPE = {
    PRIMARY: 'primary',
    SUCCESS: 'success',
    WARNING: 'warning',
    DANGER: 'danger',
    INFO: 'info'
}

export const FORM_TYPE = {
    SLOT: 'Slot',
    INPUT: "Input",
    DATE: "Date",
    TIME: "Time",

    TREE: "Tree",
    SELECTTREE: 'SelectTree',
    SELECT: "Select",

    TAG: "Tag",
    RADIO: "Radio",
    SWITCH: "Switch",
    CHECKBOX: "Checkbox",

    DIVIDER: 'Divider',
    UPLOAD: 'Upload',
    SELECT_ICON: 'SelectIcon',
    SELECT_TREE: 'SelectTree',
}

export const INPUT_TYPE = {
    NUMBER: 'number',
    TEXTAREA: 'textarea',
    PASSWORD: 'password',
    PHONE: 'phone',
    EMAIL: 'email',
    ID: 'id'
}

export const DATE_TYPE = {
    DATE: 'date',
    DATETIME: 'datetime',
    DATERANGE: 'daterange',
    DATETIMERANGE: 'datetimerange',
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year'
}

export const TIME_TYPE = {
    SELECT: 'select',
    PICKER: 'picker'
}

export const PHONE_PREFIX = ['138', '157', '186']

export const EMAIL_OPTIONS = [
    { value: "@chinaunicom.com" },
    { value: "@qq.com" },
    { value: "@163.com" },
    { value: "@gmail.com" },
    { value: "@126.com" },
    { value: "@yahoo.com.cn" },
    { value: "@vip.qq.com " },
    { value: "@foxmail.com" },
    { value: "@sina.com" },
    { value: "@sohu.com" },
    { value: "@sogou.com" }
]

export const STORE_TYPES = {
    SET_TOKEN: 'SET_TOKEN',
    SET_SIZE: 'SET_SIZE',
    SET_COLOR: 'SET_COLOR',
    TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR'
}

export const ERROR_CODE = {
    '401': '认证失败，无法访问系统资源',
    '403': '当前操作没有权限',
    '404': '访问资源不存在',
    'default': '系统未知错误，请反馈给管理员'
}