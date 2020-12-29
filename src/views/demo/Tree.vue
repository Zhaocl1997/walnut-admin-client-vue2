<template>
  <el-card>
    <template #header>
      <span>综合树，当前绑定值：【{{ treeValue }}】</span>

      <el-form inline>
        <el-space>
          <el-form-item label="多选">
            <el-switch v-model="multiple" />
          </el-form-item>
        </el-space>
      </el-form>
    </template>

    <w-tree
      v-model="treeValue"
      :data="data"
      :props="treeProps"
      :multiple="multiple"
    ></w-tree>
  </el-card>

  <br />
</template>

<script>
  import { ref, reactive, computed, defineComponent, toRefs } from 'vue'
  import wTree from '/@/components/UI/Tree/index.vue'

  export default defineComponent({
    name: 'TreeDemo',

    components: { wTree },

    setup(props, { attrs }) {
      const state = reactive({
        multiple: false,
      })

      const tree = reactive({
        treeValue: '',

        treeProps: {
          id: '_id',
          disabled: '_disabled',
        },

        data: [
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
        ...toRefs(tree),
      }
    },
  })
</script>

<style lang="scss" scoped></style>
