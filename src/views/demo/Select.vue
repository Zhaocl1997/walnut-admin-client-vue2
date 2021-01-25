<template>
  <el-card>
    <template #header>
      <span>单选-基本，当前绑定值：【{{ select1 }}】</span>
    </template>

    <w-select v-model="select1" :options="options" value-type="number" />
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>单选-对象，当前绑定值：【{{ select5 }}】</span>
    </template>

    <w-select
      v-model="select5"
      :options="options"
      value-key="value"
      value-type="number"
    />
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>多选-基本，当前绑定值：【{{ select2 }}】</span>
    </template>

    <w-select
      v-model="select2"
      multiple
      :options="options"
      value-type="number"
    />
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>多选-对象，当前绑定值：【{{ select3 }}】</span>
    </template>

    <w-select
      v-model="select3"
      multiple
      :options="options"
      value-key="value"
      value-type="number"
    />
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>多选-字符串，当前绑定值：【{{ select4 }}】</span>
    </template>

    <w-select
      v-model="select4"
      multiple
      :options="options"
      value-format=","
      value-type="number"
    ></w-select>
  </el-card>

  <br />
</template>

<script>
  import wSelect from '/@/components/UI/Select/index.vue'
  import { ref, reactive, defineComponent, toRefs } from 'vue'

  export default defineComponent({
    name: 'SelectDemo',

    components: { wSelect },

    setup() {
      const state = reactive({
        select1: '1',
        select2: ['1', '2'],
        select3: [
          { value: '1', label: 'label-1' },
          { value: '2', label: 'label-2' },
        ],
        select4: '1,3',
        select5: { value: '6', label: 'label-6' },
        select6: [],
      })

      const options = []

      for (let i = 0; i < 100; i++) {
        options.push({
          value: i + 1,
          label: `label-${i + 1}`,
        })
      }

      options.push({
        value: 999,
        label:
          '按实际的感觉哪款手机卡死的金卡金卡是否哦iJason可惜弄看看去安慰送哦缴纳哦你卡上洞口目前我竟佛南港区你看哦看谁都看上电脑上福建高考给你发哦法国OK难哦咯山东卡公司都哭闹时康复',
      })

      return {
        ...toRefs(state),
        options,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
