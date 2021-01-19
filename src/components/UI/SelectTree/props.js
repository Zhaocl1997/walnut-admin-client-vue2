'use strict'

export const wSelectTreeProps = {
  // origin
  data: Array,
  size: String,
  multiple: Boolean,
  disabled: Boolean,
  clearable: { type: Boolean, default: true },
  collapse: Boolean,
  accordion: { type: Boolean, default: true },
  placeholder: String,

  // custom
  modelValue: [String, Number, Array],
  props: Object,
}
