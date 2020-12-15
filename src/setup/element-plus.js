
'use strict'

import {
    ElAside,
    ElFooter,
    ElHeader,
    ElMain,
    ElTabs,
    ElTabPane,
    ElContainer,
    ElCard,

    ElInput,
    ElInputNumber,
    ElButton,
    ElButtonGroup,
    ElSelect,
    ElOption,
    ElTag,

    ElRadio,
    ElRadioGroup,
    ElRadioButton,

    ElCheckbox,
    ElCheckboxGroup,

    ElTimePicker,
    ElTimeSelect,
    ElDatePicker,

    ElDialog,
    ElPagination,

    ElTable,
    ElTableColumn,

    ElForm,
    ElFormItem,

    ElDivider,
    ElTooltip
} from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'

const components = [
    ElAside,
    ElFooter,
    ElHeader,
    ElMain,
    ElTabs,
    ElTabPane,
    ElContainer,
    ElCard,

    ElInput,
    ElInputNumber,
    ElButton,
    ElButtonGroup,
    ElSelect,
    ElOption,
    ElTag,

    ElRadio,
    ElRadioGroup,
    ElRadioButton,

    ElCheckbox,
    ElCheckboxGroup,

    ElTimePicker,
    ElTimeSelect,
    ElDatePicker,

    ElDialog,
    ElPagination,

    ElTable,
    ElTableColumn,

    ElForm,
    ElFormItem,

    ElDivider,
    ElTooltip
]

export function setupElementPlus(app) {
    locale.use(lang)

    components.map(comp => app.use(comp))
}
