<template>
  <pre class="json-pre" :style="{ height: height }" />
</template>

<script>
  import { reactive, defineComponent, watch } from 'vue'

  export default defineComponent({
    name: 'WJSON',

    props: {
      modelValue: [Object, Array],

      height: {
        type: String,
        default: '200px',
      },
    },

    emits: ['update:modelValue'],

    setup(props, { attrs }) {
      let perttierJSON = reactive({})

      watch(
        () => props.modelValue,
        (value) => {
          init()
        },
        {
          deep: true,
        }
      )

      const onSyntaxHighlight = (json) => {
        if (typeof json != 'string') {
          json = JSON.stringify(
            json,
            (key, value) => {
              return typeof value === 'function' ? value + '' : value
            },
            2
          )
        }

        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>')

        return json.replace(
          /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null|function|=>)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
          (match) => {
            let cls = 'number'
            if (/function|=>/.test(match)) {
              cls = 'function'
            } else if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                cls = 'key'
              } else {
                cls = 'string'
              }
            } else if (/true|false/.test(match)) {
              cls = 'boolean'
            } else if (/null/.test(match)) {
              cls = 'null'
            }

            return `<span class="${cls}">${match}</span>`
          }
        )
      }

      const init = () => {
        const target = document.querySelector('.json-pre')
        perttierJSON = onSyntaxHighlight(props.modelValue)
        target.innerHTML = perttierJSON
      }

      return {}
    },
  })
</script>

<style lang="scss" scoped>
  @import '../../../assets/style/index.scss';

  .json-pre:deep() {
    @include scrollBar;

    outline: 1px solid #ccc;
    padding: 5px;
    margin: 5px;
    overflow-y: auto;

    .string {
      color: green !important;
    }
    .number {
      color: darkorange !important;
    }
    .boolean {
      color: blue !important;
    }
    .null {
      color: magenta !important;
    }
    .key {
      color: red !important;
    }
    .function {
      color: DarkTurquoise !important;
    }
  }
</style>