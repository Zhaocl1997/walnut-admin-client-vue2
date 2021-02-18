'use strict'

export const baseTableStateSchemas = [
  {
    wType: 'Switch',
    formProp: {
      prop: 'single',
      label: '单选v-model',
    },
  },
  {
    wType: 'Switch',
    formProp: {
      prop: 'multiple',
      label: '多选v-model',
    },
  },
  {
    wType: 'Switch',
    formProp: {
      prop: 'hasButtons',
      label: '按钮组',
    },
  },
  {
    wType: 'Switch',
    formProp: {
      prop: 'hasIndex',
      label: '索引',
    },
  },
  {
    wType: 'Switch',
    formProp: {
      prop: 'hasSelect',
      label: '多选框',
    },
  },
  {
    wType: 'Switch',
    formProp: {
      prop: 'hasExpand',
      label: '展开',
    },
  },
  {
    wType: 'Switch',
    formProp: {
      prop: 'hasAction',
      label: '操作',
    },
  },
  {
    wType: 'Switch',
    formProp: {
      prop: 'hasTitle',
      label: '标题',
    },
  },
  {
    wType: 'Switch',
    formProp: {
      prop: 'hasSettings',
      label: '设置',
    },
  },
  {
    wType: 'Switch',
    formProp: {
      prop: 'hasPage',
      label: '分页',
    },
  },
  {
    wType: 'Switch',
    formProp: {
      prop: 'stripe',
      label: '斑马纹',
    },
  },
  {
    wType: 'Switch',
    formProp: {
      prop: 'border',
      label: '边框',
    },
  },
  {
    wType: 'Switch',
    formProp: {
      prop: 'loadingType',
      label: '加载类型',
    },
    componentProp: {
      inactiveText: '默认',
      activeText: '骨框架',
      inactiveValue: 'default',
      activeValue: 'skeleton',
    },
  },
  {
    wType: 'Switch',
    formProp: {
      prop: 'loading',
      label: '加载状态',
    },
  },
  {
    wType: 'Switch',
    formProp: {
      prop: 'emptyType',
      label: '无数据插槽',
    },
    componentProp: {
      inactiveText: '默认',
      activeText: '自定义',
    },
  },
  {
    wType: 'Switch',
    formProp: {
      prop: 'empty',
      label: '无数据状态',
    },
  },
  {
    wType: 'Input',
    formProp: {
      prop: 'headers',
      label: 'header绑定值',
    },
    colProp: {
      span: 24,
    },
  },
]
