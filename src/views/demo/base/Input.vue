<template>
  <div>
    <el-card>
      <template #header>
        <span>基本，当前绑定值：【{{ input1 }}】</span>
      </template>

      <w-input
        v-model="input1"
        clearable
        @clear="onClear"
        @change="onChange"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
      />
    </el-card>

    <br />

    <el-card>
      <template #header>
        <span>黑名单，当前绑定值：【{{ input2 }}】</span>
      </template>

      <w-input
        v-model="input2"
        :black-list="['<', '>']"
        placeholder="禁止输入'<', '>'"
      />
    </el-card>

    <br />

    <el-card>
      <template #header>
        <span>密码，当前绑定值：【{{ input3 }}】</span>
      </template>

      <w-input v-model="input3" show-password clearable />
    </el-card>

    <br />

    <el-card>
      <template #header>
        <span>前后置内容(prop)，当前绑定值：【{{ input4 }}】</span>
      </template>

      <w-input
        v-model="input4"
        suffix-icon="el-icon-date"
        prefix-icon="el-icon-search"
      />
    </el-card>

    <br />

    <el-card>
      <template #header>
        <span>前后置内容(slot)，当前绑定值：【{{ input5 }}】</span>
      </template>

      <w-input v-model="input5">
        <template #suffix>
          <i class="el-icon-date" />
        </template>

        <template #prefix>
          <i class="el-icon-search" />
        </template>
      </w-input>
    </el-card>

    <br />

    <el-card>
      <template #header>
        <span>前后置元素(slot)，当前绑定值：【{{ input6 }}】</span>
      </template>

      <w-input v-model="input6">
        <template #prepend>Http://</template>
        <template #append>.com</template>
      </w-input>
    </el-card>

    <br />

    <el-card>
      <template #header>
        <span>文本域，当前绑定值：【{{ input7 }}】</span>
      </template>

      <w-input
        v-model="input7"
        type="textarea"
        maxlength="30"
        show-word-limit
        :autosize="{ minRows: 2, maxRows: 4 }"
        rows="5"
      />
    </el-card>

    <br />

    <el-card>
      <template #header>
        <span>自定义修饰符，当前绑定值：【{{ input8 }}】</span>
      </template>

      <w-input v-model.capitalize="input8" placeholder="首字母大写" />
    </el-card>

    <br />

    <el-card>
      <template #header>
        <span>帮助消息，当前绑定值：【{{ input9 }}】</span>
      </template>

      <w-input v-model="input9" help-message="一些帮助填写的信息" />
    </el-card>
  </div>
</template>

<script>
  import wInput from '/@/components/UI/Input/index.vue'
  import { reactive, defineComponent, toRefs } from 'vue'

  export default defineComponent({
    name: 'Input',

    components: { wInput },

    setup() {
      const state = reactive({
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',
        input7: '',
        input8: '',
        input9: '',
      })

      const onChange = (value) => {
        console.log('[w-input change]', value)
      }

      const onInput = (value) => {
        console.log('[w-input input]', value)
      }

      const onBlur = () => {
        console.log('[w-input blur]')
      }

      const onFocus = () => {
        console.log('[w-input focus]')
      }

      const onClear = () => {
        console.log('[w-input clear]')
      }

      return {
        ...toRefs(state),

        onChange,
        onInput,
        onBlur,
        onFocus,
        onClear,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
