<template>
  <div id="tab-container">
    <el-tabs
      v-model="activeTabName"
      type="card"
      editable
      @edit="handleTabsEdit"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      />
    </el-tabs>
  </div>
</template>

<script>
import { ref, unref, reactive, defineComponent } from "vue";

export default defineComponent({
  name: "TheTab",

  components: {},

  setup() {
    const activeTabName = ref("2");
    const tabIndex = ref(2);
    let state = reactive({
      editableTabs: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content"
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content"
        }
      ]
    });

    const handleTabsEdit = (targetName, action) => {
      if (action === "add") {
        let newTabName = ++tabIndex.value + "";
        state.editableTabs.push({
          title: `New Tab${tabIndex.value}`,
          name: newTabName,
          content: `New Tab content${tabIndex.value}`
        });
        activeTabName.value = newTabName;
      }

      if (action === "remove") {
        let tabs = state.editableTabs;
        let activeName = activeTabName.value;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        activeTabName.value = activeName;
        state.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    };

    return {
      activeTabName,
      editableTabs: state.editableTabs,
      handleTabsEdit
    };
  }
});
</script>

<style lang='scss' scoped>
#tab-container {
  height: 30px;
  line-height: 30px;
  width: 100%;
}
</style>