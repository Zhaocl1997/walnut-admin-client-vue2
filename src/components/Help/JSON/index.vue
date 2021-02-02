<template>
  <pre :id="id" class="json-pre" :style="{ height: height, width: width }" />
</template>

<script>
  import { defineComponent, watch, onMounted, nextTick } from 'vue'
  import { genString } from 'easy-fns-ts'

  export default defineComponent({
    name: 'WJSON',

    props: {
      value: [Object, Array, String],

      height: {
        type: String,
        default: '200px',
      },

      width: {
        type: String,
        default: '100%',
      },
    },

    setup(props, { attrs }) {
      const id = genString(8)

      watch(
        () => props.value,
        (value) => {
          nextTick(() => {
            init()
          })
        },
        {
          deep: true,
        }
      )

      const onSyntaxHighlight = (json) => {
        if (!json) {
          return
        }

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
        const target = document.getElementById(id)
        const perttierJSON = onSyntaxHighlight(props.value)
        target.innerHTML = perttierJSON
      }

      onMounted(() => {
        nextTick(() => {
          init()
        })
      })

      return {
        id,
      }
    },
  })
</script>

<style lang="scss" scoped>
  @import '../../../assets/style/index.scss';

  /* stylelint-disable-next-line */
  .json-pre:deep() {
    padding: 5px;
    margin: 5px;
    outline: 1px solid #ccc;
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
      color: darkturquoise !important;
    }

    @include scrollBar;
  }
</style>
