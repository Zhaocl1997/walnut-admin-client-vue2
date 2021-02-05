<template>
  <div>
    <el-tabs v-model="activeTabName" tab-position="left" style="margin: 20px">
      <el-tab-pane label="Icon" name="Icon">
        <icon-demo />
      </el-tab-pane>

      <el-tab-pane label="Help" name="Help">
        <help-demo />
      </el-tab-pane>

      <!-- <el-tab-pane label="Button" name="Button">
        <button-demo />
      </el-tab-pane>

     <el-tab-pane label="Input" name="Input">
        <input-demo />
      </el-tab-pane>

      <el-tab-pane label="InputNumber" name="InputNumber">
        <input-number-demo />
      </el-tab-pane>

      <el-tab-pane label="Radio" name="Radio">
        <radio-demo />
      </el-tab-pane>

      <el-tab-pane label="Checkbox" name="Checkbox">
        <checkbox-demo />
      </el-tab-pane>

      <el-tab-pane label="Select" name="Select">
        <select-demo />
      </el-tab-pane>

      <el-tab-pane label="Date" name="Date">
        <date-demo />
      </el-tab-pane>

      <el-tab-pane label="Tag" name="Tag">
        <tag-demo />
      </el-tab-pane>

      <el-tab-pane label="Tree" name="Tree">
        <tree-demo />
      </el-tab-pane>

      <el-tab-pane label="Dropdown" name="Dropdown">
        <dropdown-demo />
      </el-tab-pane>

      <el-tab-pane label="SelectTree" name="SelectTree">
        <select-tree-demo />
      </el-tab-pane> -->

      <!-- <el-tab-pane label="Menu" name="Menu">
        <menu-demo />
      </el-tab-pane> -->

      <!-- <el-tab-pane label="Dialog" name="Dialog">
        <dialog-demo />
      </el-tab-pane>

      <el-tab-pane label="Pagination" name="Pagination">
        <pagination-demo />
      </el-tab-pane> -->

      <el-tab-pane label="Table-base" name="Table-base">
        <base-table-demo />
      </el-tab-pane>

      <!--  <el-tab-pane label="Table-api" name="Table-api">
        <api-table-demo />
      </el-tab-pane> -->

      <!-- <el-tab-pane label="useTable" name="useTable">
        <use-table-demo />
      </el-tab-pane> -->

      <!-- <el-tab-pane label="Form-base" name="Form-base">
        <base-form-demo />
      </el-tab-pane> -->

      <!--  <el-tab-pane label="Persistent" name="Persistent">
        <persistent-demo />
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
  import ButtonDemo from './Button.vue'
  import CheckboxDemo from './Checkbox.vue'
  import DateDemo from './Date.vue'
  import DialogDemo from './Dialog.vue'
  import DropdownDemo from './Dropdown.vue'
  import BaseFormDemo from './Form/baseForm.vue'
  import IconDemo from './Icon.vue'
  import HelpDemo from './Help.vue'
  import InputDemo from './Input.vue'
  import InputNumberDemo from './InputNumber.vue'
  import MenuDemo from './Menu.vue'
  import PaginationDemo from './Pagination.vue'
  import RadioDemo from './Radio.vue'
  import SelectDemo from './Select.vue'
  import SelectTreeDemo from './SelectTree.vue'
  import PersistentDemo from './Persistent.vue'

  import BaseTableDemo from './Table/baseTable.vue'
  import ApiTableDemo from './Table/apiTable.vue'
  import UseTableDemo from './Table/useTable.vue'

  import TagDemo from './Tag.vue'
  import TreeDemo from './Tree.vue'
  import { ref, reactive, defineComponent } from 'vue'

  export default defineComponent({
    name: 'Demo',

    components: {
      ButtonDemo,
      CheckboxDemo,
      DateDemo,
      DialogDemo,
      DropdownDemo,
      BaseFormDemo,
      IconDemo,
      HelpDemo,
      InputDemo,
      InputNumberDemo,
      MenuDemo,
      PaginationDemo,
      RadioDemo,
      SelectDemo,
      SelectTreeDemo,
      PersistentDemo,
      BaseTableDemo,
      ApiTableDemo,
      UseTableDemo,
      TagDemo,
      TreeDemo,
    },

    setup() {
      const activeTabName = ref('Icon')

      return {
        activeTabName,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
