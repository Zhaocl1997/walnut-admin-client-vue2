<template>
  <el-table-column
    v-bind="getBindValue"
    :align="item.align ? item.align : 'center'"
    :show-overflow-tooltip="item.tooltip ? item.tooltip : true"
  >
    <!-- default slot -->
    <template #default="{ row, column, $index }">
      <span>{{ getValue(row) }}</span>

      <template v-if="item.children && item.children.length > 0">
        <template v-for="(child, index) in item.children" :key="index">
          <table-item :item="child"></table-item>
        </template>
      </template>
    </template>

    <!-- custom slot -->
    <!-- <template v-for="i in Object.keys($slots)" #[i]="data">
      <slot :name="i" v-bind="data"></slot>
    </template> -->

    <!-- header slot -->
    <!-- <template v-if="item.headerSlot || item.editable" #header="scope">
      <template v-if="item.headerSlot">
        <slot :name="`${item.prop}-headerSlot`" />
      </template>

      <template v-if="item.editable">
        <el-space size="mini">
          <span>{{ scope.column.label }}</span>
          <i class="el-icon-edit-outline"></i>
        </el-space>
      </template>
    </template> -->
  </el-table-column>
</template>

<script>
  import { omit } from 'easy-fns-ts'
  import { ref, reactive, computed, defineComponent } from 'vue'

  function deepGet(object, path = '', defaultValue = '') {
    return (
      (!Array.isArray(path)
        ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.')
        : path
      ).reduce((o, k) => (o || {})[k], object) || defaultValue
    )
  }

  export default defineComponent({
    name: 'TableItem',

    components: {},

    props: {
      item: Object,
    },

    setup(props, { attrs, slots }) {
      const getValue = (obj) => {
        return obj[props.item.prop] || deepGet(obj, props.item.prop)
      }

      const getBindValue = computed(() => {
        return omit(props.item, 'children')
      })

      return {
        getValue,
        getBindValue,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
