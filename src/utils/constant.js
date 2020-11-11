
'use strict'

export const THEME_TYPE = {
    PRIMARY: 'primary',
    SUCCESS: 'success',
    WARNING: 'warning',
    DANGER: 'danger',
    INFO: 'info'
}

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