<template>
  <el-card>
    <template #header>
      <span>综合树，当前绑定值：【{{ treeValue }}】</span>

      <el-form inline>
        <el-space>
          <el-form-item label="多选">
            <el-switch v-model="multiple" />
          </el-form-item>

          <el-form-item v-if="multiple" label="是否只要叶子节点">
            <el-switch v-model="leafOnly" />
          </el-form-item>

          <el-form-item v-if="multiple" label="是否包含半选节点">
            <el-switch v-model="includeHalfChecked" />
          </el-form-item>

          <el-form-item v-if="multiple" label="展开">
            <el-switch v-model="expandAll" @change="onExpandAllChange" />
          </el-form-item>

          <el-form-item v-if="multiple" label="全选">
            <el-switch v-model="checkAll" @change="onCheckAllChange" />
          </el-form-item>

          <el-form-item>
            <el-button size="mini" @click="onReset">重置</el-button>
          </el-form-item>
        </el-space>
      </el-form>
    </template>

    <w-tree
      ref="wTreeDemo"
      v-model="treeValue"
      :data="data"
      :props="treeProps"
      :multiple="multiple"
      :leaf-only="leafOnly"
      :include-half-checked="includeHalfChecked"
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
      const wTreeDemo = ref(null)

      const state = reactive({
        multiple: false,
        leafOnly: false,
        includeHalfChecked: false,
        expandAll: false,
        checkAll: false,
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

      const onExpandAllChange = (val) => {
        wTreeDemo.value.expandAll(val)
      }

      const onCheckAllChange = (val) => {
        wTreeDemo.value.checkAll(val)
      }

      const onReset = () => {
        tree.treeValue = ''
        state.multiple = false
        state.leafOnly = false
        state.includeHalfChecked = false
        state.expandAll = false
        state.checkAll = false
      }

      return {
        wTreeDemo,
        ...toRefs(state),
        ...toRefs(tree),

        onExpandAllChange,
        onCheckAllChange,
        onReset,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
