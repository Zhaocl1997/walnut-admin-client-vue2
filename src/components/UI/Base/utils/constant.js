
'use strict'

import { regex } from "easy-fns/lib/regex";

// input custom type
export const INPUT_CUSTOM_TYPE = [
    {
        id: regex.id,
        info: "身份证号"
    },
    {
        phone: regex.phone,
        info: "手机号"
    },
    {
        email: regex.email,
        info: "邮箱地址"
    },
    {
        ip: regex.ip4,
        info: "IP地址"
    },
    {
        macAddress: regex.macAddress,
        info: "mac地址"
    }
];

// form type
export const FORM_TYPE = {
    INPUT: "Input",
    DATE: "Date",
    TIME: "Time",

    TREE: "Tree",
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

// table column type
export const TABLE_COL_TYPE = {
    LEFT: 'left',
    COMMON: 'common',
    RIGHT: 'right'
}

// input type
export const INPUT_TYPE = {
    NUMBER: 'number',
    TEXTAREA: 'textarea',
    PASSWORD: 'password',
    PHONE: 'phone',
    EMAIL: 'email',
    ID: 'id',
    IP: 'ip',
    MACADDRESS: 'macAddress',
    LETTER: 'letter',
    CHINESE: 'chinese'
}

// date type
export const DATE_TYPE = {
    DATE: 'date',
    DATES: 'dates',
    DATETIME: 'datetime',
    DATERANGE: 'daterange',
    MONTHRANGE: 'monthrange',
    DATETIMERANGE: 'datetimerange',
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year'
}

// time type
export const TIME_TYPE = {
    SELECT: 'select',
    PICKER: 'picker'
}
