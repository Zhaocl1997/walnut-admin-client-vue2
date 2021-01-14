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
  ElTooltip,
  ElPopover,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElSwitch,
  ElSpace,
  ElBacktop,
  ElRow,
  ElCol,
  ElSkeleton,
  ElSkeletonItem,
  ElLoading,
  ElTree,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
} from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

// import lang from 'element-plus/lib/locale/lang/zh-cn'
// import locale from 'element-plus/lib/locale'

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
  ElTooltip,
  ElPopover,
  ElSpace,
  ElBacktop,
  ElRow,
  ElCol,

  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,

  ElSwitch,

  ElSkeleton,
  ElSkeletonItem,

  ElTree,

  ElMenu,
  ElMenuItem,
  ElSubmenu,
]

const plugins = [ElLoading]

export const setupElementPlus = (app) => {
  // locale.use(lang)

  components.map((comp) => app.component(comp.name, comp))

  plugins.map((plugin) => app.use(plugin))
}