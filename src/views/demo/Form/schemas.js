'use strict'

export const baseFormStateSchemas = [
  {
    wType: 'Switch',
    prop: 'itemShow',
    label: '显隐',
  },
  {
    wType: 'Switch',
    prop: 'compact',
    label: '紧凑',
  },
  {
    wType: 'Switch',
    prop: 'mock',
    label: '模拟',
  },
  {
    wType: 'Switch',
    prop: 'scopedMock',
    label: '局部模拟',
  },
  {
    wType: 'Switch',
    prop: 'query',
    label: '查询',
  },
  {
    wType: 'Switch',
    prop: 'disabled',
    label: '禁用',
  },
  {
    wType: 'Switch',
    prop: 'inline',
    label: '行内',
  },
  {
    wType: 'Slider',
    prop: 'labelWidth',
    label: 'label宽度',
    span: 24,
    max: 200,
    marks: {
      0: '0px',
      50: '50px',
      100: '100px',
      200: '200px',
    },
  },
  {
    wType: 'Slider',
    prop: 'span',
    label: '栅格占据的列数(span)',
    span: 12,
    max: 24,
    marks: {
      0: '0',
      12: '12',
      24: '24',
    },
  },
  {
    wType: 'Slider',
    prop: 'gutter',
    label: '栅格间隔(gutter)',
    span: 12,
    max: 100,
    marks: {
      0: '0px',
      20: '20px',
      50: '50px',
      100: '100px',
    },
  },
]
