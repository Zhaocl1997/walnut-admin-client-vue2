'use strict'

export const baseTableStateSchemas = [
  {
    wType: 'Switch',
    prop: 'single',
    label: '单选',
  },
  {
    wType: 'Switch',
    prop: 'multiple',
    label: '多选',
  },
  {
    wType: 'Switch',
    prop: 'hasIndex',
    label: '索引',
  },
  {
    wType: 'Switch',
    prop: 'hasSelect',
    label: '多选框',
  },
  {
    wType: 'Switch',
    prop: 'hasExpand',
    label: '展开',
  },
  {
    wType: 'Switch',
    prop: 'hasAction',
    label: '操作',
  },
  {
    wType: 'Switch',
    prop: 'hasTitle',
    label: '标题',
  },
  {
    wType: 'Switch',
    prop: 'hasSettings',
    label: '设置',
  },
  {
    wType: 'Switch',
    prop: 'hasPage',
    label: '分页',
  },
  {
    wType: 'Switch',
    prop: 'stripe',
    label: '斑马纹',
  },
  {
    wType: 'Switch',
    prop: 'border',
    label: '边框',
  },
  {
    wType: 'Switch',
    prop: 'loadingType',
    label: '加载类型',
    inactiveText: '默认',
    activeText: '骨框架',
    inactiveValue: 'default',
    activeValue: 'skeleton',
  },
  {
    wType: 'Switch',
    prop: 'loading',
    label: '加载状态',
  },
  {
    wType: 'Switch',
    prop: 'emptyType',
    label: '无数据插槽',
    inactiveText: '默认',
    activeText: '自定义',
  },
  {
    wType: 'Switch',
    prop: 'empty',
    label: '无数据状态',
  },
  {
    wType: 'Input',
    prop: 'headers',
    label: 'header绑定值',
    span: 24,
  },
]
