<template>
  <div>
    <el-card>
      <template #header>
        <span>集成表单，当前绑定值：</span>

        <w-JSON :value="baseFormData"></w-JSON>

        <w-form
          v-model="baseFormStateData"
          :schemas="getFormStateSchema"
          label-width="auto"
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
        :count-to-fold="3"
        :label-width="`${baseFormStateData.labelWidth}px`"
        @query="onQuery"
        @reset="onReset"
      >
        <template #inputSlot="{ disabled }">
          <el-input
            v-model="baseFormData.inputSlot"
            clearable
            placeholder="自定义插槽"
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

  export default defineComponent({
    name: 'BaseForm',

    components: { wForm, wJSON },

    setup() {
      const formRef = ref(null)

      const baseFormStateData = reactive({
        itemShow: true,

        compact: false,
        mock: false,
        scopedMock: false,
        query: false,
        disabled: false,
        inline: false,
        labelWidth: 100,
        span: 24,
        gutter: 0,
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
              prop: 'itemShow',
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
              prop: 'scopedMock',
              label: '局部模拟',
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
            wType: 'Switch',
            formProp: {
              prop: 'inline',
              label: '行内',
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
        ]
      })

      const getFormSchema = computed(() => {
        return [
          // ==================================
          // ============== Input =============
          // ==================================
          {
            wType: 'Divider',
            title: 'Input',
            fold: true,
            defaultFold: false,
            countToFold: 1,
            children: [
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
            ],
          },

          // ======================================
          // ============= Input Number ===========
          // ======================================
          {
            wType: 'Divider',
            title: 'InputNumber',
            fold: true,
            defaultFold: false,
            countToFold: 0,
            children: [
              {
                wType: 'InputNumber',
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
            title: 'Select',
            fold: true,
            defaultFold: false,
            countToFold: 0,
            children: [
              {
                wType: 'Select',
                formProp: {
                  prop: 'formSelectBase',
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
            ],
          },

          // {
          //   wType: 'Select',
          //   formProp: {
          //     prop: 'formSelectMultipleArray',
          //     label: '多选-数组',
          //   },
          //   componentProp: {
          //     placeholder: '多选-数组',
          //     options,
          //     clearable: true,
          //     multiple: true,
          //   },
          // },
          // {
          //   wType: 'Select',
          //   formProp: {
          //     prop: 'formSelectMultipleCollapse',
          //     label: '多选-坍塌',
          //   },
          //   componentProp: {
          //     placeholder: '多选-坍塌',
          //     options,
          //     clearable: true,
          //     multiple: true,
          //     collapseTags: true,
          //   },
          // },
          // {
          //   wType: 'Select',
          //   formProp: {
          //     prop: 'formSelectMultipleObject',
          //     label: '多选-对象',
          //   },
          //   componentProp: {
          //     placeholder: '多选-对象',
          //     options,
          //     clearable: true,
          //     multiple: true,
          //     valueKey: 'value',
          //   },
          // },

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
