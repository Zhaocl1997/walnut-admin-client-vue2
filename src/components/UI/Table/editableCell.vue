<template>
  <div v-loading="loading" class="w-table-edit-cell">
    <template v-if="!editable">
      <!-- editable default display -->
      <el-space size="mini">
        <span>{{ getFormattedValue }}</span>
        <i
          class="el-icon-edit-outline u-pointer w-table-edit-icon"
          @click="onToggleEditableCell(row)"
        ></i>
      </el-space>
    </template>

    <template v-else>
      <el-space size="mini">
        <!-- editable custom slot -->
        <template v-if="item.editableSlot">
          <slot></slot>
        </template>

        <!-- editable default input -->
        <template v-else>
          <el-input
            ref="editableCellInputRef"
            v-model="editableValue"
            size="small"
            @keyup.enter="onEditableCellSave"
          ></el-input>
        </template>

        <i class="el-icon-check u-pointer" @click="onEditableCellSave"></i>
        <i class="el-icon-close u-pointer" @click="onEditableCellCancel"></i>
      </el-space>
    </template>
  </div>
</template>

<script>
  import { ref, computed, defineComponent, nextTick } from 'vue'

  export default defineComponent({
    name: 'WTableEditableCell',

    props: {
      item: Object,
      row: Object,
    },

    emits: ['cell-change'],

    setup(props, { attrs, emit }) {
      const loading = ref(false)
      const editable = ref(false)
      const editableValue = ref('')
      const editableCellInputRef = ref(null)

      const getFormattedValue = computed(() => {
        return props.item.formatter
          ? props.item.formatter(props.row)
          : props.row[props.item.prop]
      })

      const getEditableValue = computed(() => {
        return props.item.editableSlot
          ? props.row[props.item.prop]
          : editableValue.value
      })

      const changeLoading = (val) => {
        loading.value = val
      }

      const onToggleEditableCell = (row) => {
        editable.value = true
        editableValue.value = row[props.item.prop]

        if (!props.item.editableSlot) {
          nextTick(() => {
            editableCellInputRef.value.focus()
          })
        }
      }

      const onEditableCellSave = () => {
        editable.value = false

        emit('cell-change', {
          newValue: getEditableValue.value,
          loadStart: () => changeLoading(true),
          loadEnd: () => changeLoading(false),

          row: props.row,
          prop: props.item.prop,
        })
      }

      const onEditableCellCancel = () => {
        editable.value = false
      }

      return {
        loading,
        editable,
        editableValue,
        editableCellInputRef,
        getFormattedValue,

        onToggleEditableCell,
        onEditableCellSave,
        onEditableCellCancel,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .el-icon-check,
  .el-icon-close {
    &:hover {
      color: rgb(92, 182, 255);
      transform: scale(1.1);
    }
  }
  .w-table-edit-cell:hover {
    .w-table-edit-icon {
      display: initial;
    }
  }
  .w-table-edit-icon {
    position: absolute;
    top: 4px;
    right: 0;
    display: none;
  }
</style>
