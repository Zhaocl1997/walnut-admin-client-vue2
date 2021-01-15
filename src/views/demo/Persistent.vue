<template>
  <el-card>
    <template #header>
      <w-title show-left>Persistent</w-title>
    </template>

    <el-row>
      <el-select v-model="type">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-row>

    <br />

    <el-row>
      <el-button type="primary" @click="onSet">Set</el-button>
      <el-button type="success" @click="onGet">Get</el-button>
      <el-button type="info" @click="onRemove">Remove</el-button>
      <el-button type="danger" @click="onClear">Clear</el-button>

      <el-button type="primary" @click="onSetObject"
        >Set Object(demo)</el-button
      >
      <el-button type="primary" @click="onSetArray">Set Array(demo)</el-button>
    </el-row>

    <br />

    <el-row>
      <el-input v-model="key" placeholder="key" clearable />
    </el-row>

    <br />

    <el-row>
      <el-input v-model="value" placeholder="set value" clearable />
    </el-row>

    <el-row>
      <w-JSON :value="displayValue"></w-JSON>
    </el-row>
  </el-card>
</template>

<script>
  import { ref, defineComponent, reactive, toRefs } from 'vue'
  import { ElMessage } from 'element-plus'
  import {
    setLocal,
    getLocal,
    clearLocal,
    removeLocal,
    setSession,
    getSession,
    clearSession,
    removeSession,
    setCookie,
    getCookie,
    clearCookie,
    removeCookie,
  } from '/@/utils/persistent'
  import wTitle from '/@/components/Help/Title/index.vue'
  import wJSON from '/@/components/Help/JSON/index.vue'

  export default defineComponent({
    name: 'WPersistent',

    components: { wTitle, wJSON },

    setup(props, { attrs }) {
      const state = reactive({
        type: 'l',
        options: [
          {
            value: 'l',
            label: 'local storage',
          },
          {
            value: 's',
            label: 'session storage',
          },
          {
            value: 'c',
            label: 'cookie',
          },
        ],

        key: '',
        value: '',
        displayValue: '',
      })

      const onSet = () => {
        if (!state.key || !state.value) {
          ElMessage.warning('Please enter key/value!')
          return
        }
        switch (state.type) {
          case 'l':
            setLocal(state.key, state.value)
            break

          case 's':
            setSession(state.key, state.value)
            break

          case 'c':
            setCookie(state.key, state.value)
            break

          default:
            break
        }
        state.value = ''
      }

      const onGet = () => {
        if (!state.key) {
          ElMessage.warning('Please enter key!')
          return
        }
        switch (state.type) {
          case 'l':
            state.displayValue = getLocal(state.key)
            break

          case 's':
            state.displayValue = getSession(state.key)
            break

          case 'c':
            state.displayValue = getCookie(state.key)
            break

          default:
            break
        }
      }

      const onRemove = () => {
        if (!state.key) {
          ElMessage.warning('Please enter key!')
          return
        }
        switch (state.type) {
          case 'l':
            removeLocal(state.key)
            break

          case 's':
            removeSession(state.key)
            break

          case 'c':
            removeCookie(state.key)
            break

          default:
            break
        }
        state.key = ''
        state.value = ''
        state.displayValue = ''
      }

      const onClear = () => {
        switch (state.type) {
          case 'l':
            clearLocal()
            break

          case 's':
            clearSession()
            break

          case 'c':
            clearCookie()
            break

          default:
            break
        }
        state.key = ''
        state.value = ''
        state.displayValue = ''
      }

      const onSetObject = () => {
        if (!state.key) {
          ElMessage.warning('Please enter key!')
          return
        }

        const v = {
          name: 'Jack',
          age: 23,
          isSingle: true,
          hobbies: {
            indoor: ['books', 'movies'],
            outdoor: ['jogging', 'swimming'],
          },
          family: [
            {
              name: 'Rose',
              relationship: 'girlfriend',
              age: 21,
              collage: 'WTF1',
            },
            {
              name: 'Ana',
              relationship: 'mom',
              age: 48,
              collage: 'WTF2',
            },
          ],
        }

        switch (state.type) {
          case 'l':
            setLocal(state.key, v)
            break

          case 's':
            setSession(state.key, v)
            break

          case 'c':
            setCookie(state.key, v)
            break

          default:
            break
        }
        state.value = ''
      }

      const onSetArray = () => {
        if (!state.key) {
          ElMessage.warning('Please enter key!')
          return
        }

        const v = [
          {
            label: '性别',
            prop: 'sex',
            width: '80px',
            sortable: 'custom',
            visible: true,
          },
          {
            label: '年龄',
            prop: 'age',
            width: '200px',
            formatter: '({ age }) => `${age}岁`',
            editable: true,
            editableSlot: true,
            visible: true,
          },
          {
            label: '省份',
            prop: 'province',
            width: '100px',
            filters: [
              {
                text: '北京',
                value: '北京',
              },
              {
                text: '河南省',
                value: '河南省',
              },
              {
                text: '广东省',
                value: '广东省',
              },
              {
                text: '黑龙江省',
                value: '黑龙江省',
              },
            ],
            filterPlacement: 'bottom-end',
            filterMethod:
              "(value, row, column) => {\n        const property = column['property']\n        return row[property] === value\n      }",
            visible: true,
          },
        ]

        switch (state.type) {
          case 'l':
            setLocal(state.key, v)
            break

          case 's':
            setSession(state.key, v)
            break

          case 'c':
            setCookie(state.key, v)
            break

          default:
            break
        }
        state.value = ''
      }

      return {
        ...toRefs(state),

        onSet,
        onGet,
        onClear,
        onRemove,
        onSetObject,
        onSetArray,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
