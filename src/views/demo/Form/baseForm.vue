<template>
  <div>
    <el-card>
      <template #header>
        <span>集成表单，当前绑定值：</span>

        <w-JSON :value="baseFormData"></w-JSON>

        <w-form
          v-model="baseFormStateData"
          :schemas="getFormStateSchema"
          compact
          :span="4"
        ></w-form>
      </template>

      <w-form
        ref="formRef"
        v-model="baseFormData"
        v-bind="baseFormStateData"
        :schemas="getFormSchema"
        :rules="baseFormRules"
        :label-width="`${baseFormStateData.labelWidth}px`"
        default-fold
        @query="onQuery"
        @reset="onReset"
      >
        <template #inputSlot="{ disabled }">
          <el-input
            v-model="baseFormData.inputSlot"
            clearable
            placeholder="自定义插槽"
            :disabled="disabled"
          />
        </template>
      </w-form>
    </el-card>
  </div>
</template>

<script>
  import { reactive, computed, defineComponent, toRefs, ref } from 'vue'
  import wForm from '/@/components/UI/Form'
  import wJSON from '/@/components/Help/JSON/index.vue'
  import { genUUID } from 'easy-fns-ts'

  export default defineComponent({
    name: 'BaseForm',

    components: { wForm, wJSON },

    setup() {
      const formRef = ref(null)

      const baseFormStateData = reactive({
        itemVisible: true,

        compact: false,
        mock: false,
        query: false,
        disabled: false,
        labelWidth: 100,
        span: 24,
        gutter: 0,
        countToFold: 2,
      })

      const options = [
        {
          value: '1',
          label: '北京',
        },
        {
          value: '2',
          label: '上海',
        },
        {
          value: '3',
          label: '广州',
        },
        {
          value: '4',
          label: '深圳',
        },
      ]

      const onInput = (v) => {
        console.log(v)
      }

      const onQuery = () => {
        console.log('query')
      }

      const onReset = () => {
        console.log('reset')
      }

      const onBlur = () => {
        console.log('blur')
      }

      const getFormStateSchema = computed(() => {
        return [
          {
            wType: 'Switch',
            formProp: {
              prop: 'itemVisible',
              label: '显隐',
            },
          },
          {
            wType: 'Switch',
            formProp: {
              prop: 'compact',
              label: '紧凑',
            },
          },
          {
            wType: 'Switch',
            formProp: {
              prop: 'mock',
              label: '模拟',
            },
          },
          {
            wType: 'Switch',
            formProp: {
              prop: 'query',
              label: '查询',
            },
          },
          {
            wType: 'Switch',
            formProp: {
              prop: 'disabled',
              label: '禁用',
            },
          },
          {
            wType: 'Slider',
            formProp: {
              prop: 'labelWidth',
              label: 'label宽度',
            },
            componentProp: {
              max: 200,
              marks: {
                0: '0px',
                50: '50px',
                100: '100px',
                200: '200px',
              },
            },
            colProp: {
              span: 24,
            },
          },
          {
            wType: 'Slider',
            formProp: {
              prop: 'span',
              label: '栅格占据的列数(span)',
            },
            componentProp: {
              max: 24,
              marks: {
                0: '0',
                12: '12',
                24: '24',
              },
            },
            colProp: {
              span: 24,
            },
          },
          {
            wType: 'Slider',
            formProp: {
              prop: 'gutter',
              label: '栅格间隔(gutter)',
            },
            componentProp: {
              max: 100,
              marks: {
                0: '0px',
                20: '20px',
                50: '50px',
                100: '100px',
              },
            },
            colProp: {
              span: 24,
            },
          },
          {
            wType: 'Slider',
            formProp: {
              prop: 'countToFold',
              label: '查询表单收起时显示个数',
            },
            componentProp: {
              max: 8,
              marks: {
                0: '0个',
                4: '4个',
                8: '8个',
              },
            },
            colProp: {
              span: 24,
            },
            visible: baseFormStateData.query,
          },
        ]
      })

      const getFormSchema = computed(() => {
        if (baseFormStateData.query) {
          return [
            {
              wType: 'Input',
              formProp: {
                prop: 'inputBase',
                label: '基本',
              },
              componentProp: {
                placeholder: '基本',
                clearable: true,
              },
            },
            {
              wType: 'Input',
              formProp: {
                prop: 'inputVisible',
                label: '显隐',
              },
              componentProp: {
                placeholder: '显隐',
                clearable: true,
              },

              visible: baseFormStateData.itemVisible,
            },
            {
              wType: 'Input',
              formProp: {
                prop: 'inputSlot',
                label: '自定义插槽',
              },
              componentProp: {
                placeholder: '自定义插槽',
              },
            },
            {
              wType: 'Input',
              formProp: {
                prop: 'inputModifiers',
                label: '自定义修饰符',
              },
              componentProp: {
                placeholder: '自定义修饰符',
                modelModifiers: {
                  capitalize: true,
                },
              },
            },
            {
              wType: 'Input',
              formProp: {
                prop: 'inputBlackList',
                label: '黑名单',
              },
              componentProp: {
                placeholder: "禁止输入['<', '>']",
                blackList: ['<', '>'],
              },
              componentEvent: {
                input: onInput,
              },
            },
            {
              wType: 'Input',
              formProp: {
                prop: 'inputPassword',
                label: '密码框',
              },
              componentProp: {
                placeholder: '密码框',
                showPassword: true,
                clearable: true,
              },
            },
            {
              wType: 'Input',
              formProp: {
                prop: 'inputProp',
                label: '前后置内容',
              },
              componentProp: {
                placeholder: '前后置内容',
                suffixIcon: 'el-icon-date',
                prefixIcon: 'el-icon-search',
              },
            },
            {
              wType: 'Input',
              formProp: {
                prop: 'inputTextarea',
                label: '文本域',
              },
              componentProp: {
                placeholder: '文本域',
                type: 'textarea',
                maxlength: 200,
                showWordLimit: true,
                rows: 5,
              },
            },
          ]
        } else {
          return [
            // ==================================
            // ============== Input =============
            // ==================================
            {
              wType: 'Divider',
              wId: genUUID(),
              title: 'Input',
              fold: true,
              defaultFold: true,
              countToFold: 3,
              children: [
                {
                  wType: 'Input',
                  wId: genUUID(),
                  formProp: {
                    prop: 'inputBase',
                    label: '基本',
                  },
                  componentProp: {
                    placeholder: '基本',
                    clearable: true,
                  },
                },
                {
                  wType: 'Input',
                  wId: genUUID(),
                  formProp: {
                    prop: 'inputVisible',
                    label: '显隐',
                  },
                  componentProp: {
                    placeholder: '显隐',
                    clearable: true,
                  },

                  visible: baseFormStateData.itemVisible,
                },
                {
                  wType: 'Input',
                  wId: genUUID(),
                  formProp: {
                    prop: 'inputSlot',
                    label: '自定义插槽',
                  },
                  componentProp: {
                    placeholder: '自定义插槽',
                  },
                },
                {
                  wType: 'Input',
                  wId: genUUID(),
                  formProp: {
                    prop: 'inputModifiers',
                    label: '自定义修饰符',
                  },
                  componentProp: {
                    placeholder: '自定义修饰符',
                    modelModifiers: {
                      capitalize: true,
                    },
                  },
                },
                {
                  wType: 'Input',
                  wId: genUUID(),
                  formProp: {
                    prop: 'inputBlackList',
                    label: '黑名单',
                  },
                  componentProp: {
                    placeholder: "禁止输入['<', '>']",
                    blackList: ['<', '>'],
                  },
                  componentEvent: {
                    input: onInput,
                  },
                },
                {
                  wType: 'Input',
                  wId: genUUID(),
                  formProp: {
                    prop: 'inputPassword',
                    label: '密码框',
                  },
                  componentProp: {
                    placeholder: '密码框',
                    showPassword: true,
                    clearable: true,
                  },
                },
                {
                  wType: 'Input',
                  wId: genUUID(),
                  formProp: {
                    prop: 'inputProp',
                    label: '前后置内容',
                  },
                  componentProp: {
                    placeholder: '前后置内容',
                    suffixIcon: 'el-icon-date',
                    prefixIcon: 'el-icon-search',
                  },
                },
                {
                  wType: 'Input',
                  wId: genUUID(),
                  formProp: {
                    prop: 'inputTextarea',
                    label: '文本域',
                  },
                  componentProp: {
                    placeholder: '文本域',
                    type: 'textarea',
                    maxlength: 200,
                    showWordLimit: true,
                    rows: 5,
                  },
                },
              ],
            },

            // ======================================
            // ============= Input Number ===========
            // ======================================
            {
              wType: 'Divider',
              wId: genUUID(),
              title: 'InputNumber',
              fold: true,
              defaultFold: false,
              countToFold: 0,
              children: [
                {
                  wType: 'InputNumber',
                  wId: genUUID(),
                  formProp: {
                    prop: 'inputNumberBase',
                    label: '数字框',
                  },
                  componentProp: {
                    placeholder: '数字框',
                    step: 5,
                    max: 30,
                    min: 5,
                    precision: 4,
                  },
                },
              ],
            },

            // ==================================
            // ============== Select ============
            // ==================================
            {
              wType: 'Divider',
              wId: genUUID(),
              title: 'Select',
              fold: true,
              defaultFold: false,
              countToFold: 0,
              children: [
                {
                  wType: 'Select',
                  wId: genUUID(),
                  formProp: {
                    prop: 'selectBase',
                    label: '基本',
                  },
                  componentProp: {
                    placeholder: '基本',
                    options,
                    clearable: true,
                  },
                  componentEvent: {
                    blur: onBlur,
                  },
                },
                {
                  wType: 'Select',
                  wId: genUUID(),
                  formProp: {
                    prop: 'selectMultipleArray',
                    label: '多选-数组',
                  },
                  componentProp: {
                    placeholder: '多选-数组',
                    options,
                    clearable: true,
                    multiple: true,
                  },
                },
                {
                  wType: 'Select',
                  wId: genUUID(),
                  formProp: {
                    prop: 'selectMultipleCollapse',
                    label: '多选-坍塌',
                  },
                  componentProp: {
                    placeholder: '多选-坍塌',
                    options,
                    clearable: true,
                    multiple: true,
                    collapseTags: true,
                  },
                },
                {
                  wType: 'Select',
                  wId: genUUID(),
                  formProp: {
                    prop: 'selectMultipleObject',
                    label: '多选-对象',
                  },
                  componentProp: {
                    placeholder: '多选-对象',
                    options,
                    clearable: true,
                    multiple: true,
                    valueKey: 'value',
                  },
                },
                {
                  wType: 'Select',
                  wId: genUUID(),
                  formProp: {
                    prop: 'selectMultipleString',
                    label: '多选-字符串',
                  },
                  componentProp: {
                    placeholder: '多选-字符串',
                    options,
                    clearable: true,
                    multiple: true,
                    valueFormat: ',',
                  },
                },
              ],
            },

            // ==================================
            // ============== Switch ============
            // ==================================
            // {
            //   wType: 'Divider',
            //   title: 'Switch',
            //   fold: true,
            //   defaultFold: false,
            //   countToFold: 0,
            // },
            // {
            //   wType: 'Switch',
            //   formProp: {
            //     prop: 'formSwitchBase',
            //     label: '基本',
            //   },
            // },

            // ==================================
            // ============== Slider ============
            // ==================================
            // {
            //   wType: 'Divider',
            //   title: 'Slider',
            //   fold: true,
            //   defaultFold: true,
            //   countToFold: 0,
            // },
            // {
            //   wType: 'Slider',
            //   formProp: {
            //     prop: 'formSliderBase',
            //     label: '基本',
            //   },
            // },
          ]
        }
      })

      const baseForm = reactive({
        baseFormData: {
          pageNum: 1,
          pageSize: 10,
        },
      })

      return {
        formRef,

        baseFormStateData,

        ...toRefs(baseForm),
        getFormStateSchema,
        getFormSchema,

        baseFormRules: {
          formInputBase: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          formSelectBase: [
            { required: true, message: '请选择', trigger: 'change' },
          ],
        },

        onQuery,
        onReset,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
