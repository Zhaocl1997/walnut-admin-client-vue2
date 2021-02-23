'use strict'

export const tableHeader = [
  {
    label: '姓名',
    prop: 'name',
    width: '200',
    editable: true,
  },
  {
    label: '性别',
    prop: 'sex',
    width: '80',
    // sortable: 'custom',
  },
  {
    label: '年龄',
    prop: 'age',
    width: '200',
    formatter: ({ age }) => `${age}岁`,
    editable: true,
    editableSlot: true,
  },
  {
    label: '省份',
    prop: 'province',
    width: '100',
    // filters: [
    //   { text: '北京', value: '北京' },
    //   { text: '河南省', value: '河南省' },
    //   { text: '广东省', value: '广东省' },
    //   { text: '黑龙江省', value: '黑龙江省' },
    // ],
    // filterPlacement: 'bottom-end',
    // filterMethod: onTableFilter,
  },
  {
    label: '城市',
    prop: 'city',
    width: '100',
  },
  {
    label: '区县',
    prop: 'country',
    width: '100',
  },
  {
    label: '个人网址',
    prop: 'site',
    width: '100',
  },
  {
    label: '状态',
    prop: 'status',
    width: '100',
    slot: true,
  },
  {
    label: '创建日期',
    prop: 'createAt',
    width: '100',
  },
  {
    label: '家庭',
    children: [
      {
        label: '父亲姓名',
        prop: 'family.dad',
        width: '150',
      },
      {
        label: '母亲姓名',
        prop: 'family.mom',
        width: '150',
        headerSlot: true,
      },
    ],
  },
]
