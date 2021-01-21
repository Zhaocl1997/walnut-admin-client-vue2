<template>
  <el-card>
    <template #header>
      <span>单选-基本，当前绑定值：【{{ state.select1 }}】</span>
    </template>

    <w-select v-model="state.select1" :options="options" />
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>多选-基本，当前绑定值：【{{ state.select2 }}】</span>
    </template>

    <w-select v-model="state.select2" multiple :options="options" />
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>多选-对象，当前绑定值：【{{ state.select3 }}】</span>
    </template>

    <w-select
      v-model="state.select3"
      multiple
      :options="options"
      value-key="value"
    />
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>多选-字符串，当前绑定值：【{{ state.select4 }}】</span>
    </template>

    <w-select
      v-model="state.select4"
      multiple
      :options="options"
      value-format=","
    ></w-select>
  </el-card>

  <br />
</template>

<script>
  import wSelect from '/@/components/UI/Select/index.vue'
  import { ref, reactive, defineComponent } from 'vue'

  export default defineComponent({
    name: 'SelectDemo',

    components: { wSelect },

    setup() {
      const state = reactive({
        select1: 'value-1',
        select2: ['value-1', 'value-2'],
        select3: [
          { value: 'value-1', label: 'label-1' },
          { value: 'value-2', label: 'label-2' },
        ],
        select4: 'value-1,value-3',
        select5: [],
        select6: [],
      })

      const options = []

      for (let i = 0; i < 100; i++) {
        options.push({
          value: `value-${i + 1}`,
          label: `label-${i + 1}`,
        })
      }

      options.push({
        value: 'qwe',
        label:
          '按实际的感觉哪款手机卡死的金卡金卡是否哦iJason可惜弄看看去安慰送哦缴纳哦你卡上洞口目前我竟佛南港区你看哦看谁都看上电脑上福建高考给你发哦法国OK难哦咯山东卡公司都哭闹时康复',
      })

      return {
        state,

        options,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
