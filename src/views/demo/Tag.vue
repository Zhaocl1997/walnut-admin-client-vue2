<template>
  <el-card>
    <template #header>
      <span>基本，当前绑定值：【{{ tag1 }}】</span>
    </template>

    <w-tag v-model="tag1" :options="options" />
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>可删，当前绑定值：【{{ tag2 }}】</span>
    </template>

    <w-tag v-model="tag2" :options="options" closable />
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>显示值与真实值相同 / 可加，当前绑定值：【{{ tag3 }}】</span>
    </template>

    <w-tag v-model="tag3" :options="options" value-key="value" addable />
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>显示值与真实值相同 / 唯一值，当前绑定值：【{{ tag4 }}】</span>
    </template>

    <w-tag
      v-model="tag4"
      :options="options2"
      value-key="cityName"
      addable
      closable
      unique
    />
  </el-card>

  <br />
</template>

<script>
  import wTag from '/@/components/UI/Tag/index.vue'
  import { toRefs, reactive, computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'TagDemo',

    components: { wTag },

    setup() {
      const state = reactive({
        tag1: '',
        tag2: '',
        tag3: '',
        tag4: '',
        tag5: '',
        tag6: '',
        tag7: '',
        tag8: '',
      })

      const options = [
        {
          value: '1',
          label: '北京',
          props: {
            type: 'success',
          },
        },
        {
          value: '2',
          label: '上海',
          props: {
            type: 'info',
          },
        },
        {
          value: '3',
          label: '广州',
          props: {
            type: 'warning',
          },
        },
        {
          value: '4',
          label: '深圳',
          props: {
            type: 'danger',
          },
        },
      ]

      const options2 = [
        {
          cityName: '北京',
          props: {
            type: 'success',
          },
        },
        {
          cityName: '上海',
          props: {
            type: 'info',
          },
        },
        {
          cityName: '广州',
          props: {
            type: 'warning',
          },
        },
        {
          cityName: '深圳',
          props: {
            type: 'danger',
          },
        },
      ]

      return {
        ...toRefs(state),
        options,
        options2,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
