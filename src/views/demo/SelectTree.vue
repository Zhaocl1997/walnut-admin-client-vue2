<template>
  <el-card>
    <template #header>
      <span>下拉树-单选，当前绑定值：【{{ selectTree1 }}】</span>
    </template>

    <w-select-tree
      v-model="selectTree1"
      :data="selectTreeData"
      :props="selectTreeProps"
    />
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>下拉树-多选，当前绑定值：【{{ selectTree2 }}】</span>
    </template>

    <w-select-tree
      v-model="selectTree2"
      :data="selectTreeData"
      :props="selectTreeProps"
      multiple
    />
  </el-card>

  <br />
</template>

<script>
  import { ref, reactive, computed, defineComponent, toRefs } from 'vue'
  import wSelectTree from '/@/components/UI/SelectTree/index.vue'

  export default defineComponent({
    name: 'SelectTreeDemo',

    components: { wSelectTree },

    setup(props, { attrs }) {
      const state = reactive({
        selectTree1: '',
        selectTree2: '',

        selectTreeProps: {
          id: '_id',
          disabled: '_disabled',
        },

        selectTreeData: [
          {
            _id: 1,
            label: '一级 1',
            children: [
              {
                _id: 4,
                label: '二级 1-1',
                children: [
                  {
                    _id: 9,
                    label: '三级 1-1-1',
                  },
                  {
                    _id: 10,
                    label: '三级 1-1-2',
                  },
                ],
              },
              {
                _id: 11,
                label: '二级 1-2',
                children: [
                  {
                    _id: 12,
                    label: '三级 1-2-1',
                  },
                  {
                    _id: 13,
                    label: '三级 1-2-2',
                    _disabled: true,
                  },
                ],
              },
            ],
          },
          {
            _id: 2,
            label: '一级 2',
            children: [
              {
                _id: 5,
                label: '二级 2-1',
                children: [
                  {
                    _id: 14,
                    label: '三级 2-1-1',
                  },
                  {
                    _id: 15,
                    label: '三级 2-1-2',
                  },
                ],
              },
              {
                _id: 6,
                label: '二级 2-2',
                children: [
                  {
                    _id: 16,
                    label: '三级 2-2-1',
                    _disabled: true,
                  },
                  {
                    _id: 17,
                    label: '三级 2-2-2',
                  },
                ],
              },
            ],
          },
          {
            _id: 3,
            label: '一级 3',
            children: [
              {
                _id: 7,
                label: '二级 3-1',
                disabled: true,
              },
              {
                _id: 8,
                label: '二级 3-2',
              },
            ],
          },
        ],
      })

      return {
        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped></style>
