<template>
  <pre class="json-pre"></pre>
</template>

<script lang='ts'>
import { reactive, defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "wJSON",

  props: {
    content: [Object, Array]
  },

  setup(props, { attrs }) {
    let perttierJSON = reactive({});

    const onSyntaxHighlight = json => {
      if (typeof json != "string") {
        json = JSON.stringify(json, undefined, 2);
      }

      json = json
        .replace(/&/g, "&")
        .replace(/</g, "<")
        .replace(/>/g, ">");

      return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function(match) {
          var cls = "number";
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = "key";
            } else {
              cls = "string";
            }
          } else if (/true|false/.test(match)) {
            cls = "boolean";
          } else if (/null/.test(match)) {
            cls = "null";
          }
          return '<span class="' + cls + '">' + match + "</span>";
        }
      );
    };

    const init = () => {
      perttierJSON = onSyntaxHighlight(props.content);
      document.querySelector(".json-pre").innerHTML = perttierJSON;
    };

    onMounted(() => {
      init();
    });

    return {};
  }
});
</script>

<style lang='scss' scoped>
.json-pre:deep() {
  outline: 1px solid #ccc;
  padding: 5px;
  margin: 5px;

  .string {
    color: green !important;
  }
  .number {
    color: darkorange !important;
  }
  .boolean {
    color: blue !important;
  }
  .null {
    color: magenta !important;
  }
  .key {
    color: red !important;
  }
}
</style>