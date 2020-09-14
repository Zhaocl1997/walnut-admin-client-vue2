<template>
  <editor v-model="selfValue" :init="init" :api-key="tinyMCEAPIKEY" />
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/icons/default/icons";
import "tinymce/themes/silver";

// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
//--------------------插入引入--------------------
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/link"; //超链接插件
import "tinymce/plugins/code"; //代码块插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/contextmenu"; //右键菜单插件
import "tinymce/plugins/wordcount"; // 字数统计插件
import "tinymce/plugins/colorpicker"; //选择颜色插件
import "tinymce/plugins/textcolor"; //文本颜色插件
import "tinymce/plugins/fullscreen"; //全屏
import "tinymce/plugins/help"; // 帮助
import "tinymce/plugins/charmap";
import "tinymce/plugins/paste";
import "tinymce/plugins/print";
import "tinymce/plugins/preview";
import "tinymce/plugins/hr";
import "tinymce/plugins/anchor";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/spellchecker";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/noneditable";
import "tinymce/plugins/autosave";
import "tinymce/plugins/fullpage";
import "tinymce/plugins/toc";
import "tinymce/plugins/advlist";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/template";

import templates from "./templates";
import ValueMixins from "@/mixins/Value";

export default {
  name: "wEditor",

  components: { Editor },

  mixins: [ValueMixins],

  data() {
    return {
      tinyMCEAPIKEY: "jnibjm1g28r2ttpgdw6x3pcqfhjvaoasovjvxvkso0l10bb8",

      init: {
        selector: "tinymce",
        height: 500, // 高度
        draggable_modal: true, // 窗口可拖拽

        skin_url: "/tinymce/skins/ui/oxide", // 皮肤路径
        language_url: "/tinymce/langs/zh_CN.js", // 汉化文件路径
        emoticons_database_url: "/tinymce/emoji/index.js", // emoji路径

        language: "zh_CN", // 汉化
        branding: false, // 去水印

        menubar: "file edit insert view format table tools help", // 菜单
        help_tabs: ["shortcuts"], // 帮助tab只留快捷键页面
        elementpath: true, // 禁用编辑器底部的状态栏
        statusbar: true, // 隐藏编辑器底部的状态栏

        // 字体大小
        fontsize_formats: "14px 16px 18px 20px 24px 26px 28px 30px 32px 36px",

        // 字体
        font_formats:
          "微软雅黑=Microsoft YaHei,Helvetica Neue;PingFang SC;sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun;serifsans-serif;Terminal=terminal;monaco;Times New Roman=times new roman;times",

        // 插件
        plugins:
          "lists advlist image media table wordcount code fullscreen help toc fullpage nonbreaking insertdatetime visualchars visualblocks searchreplace spellchecker pagebreak link charmap paste print preview hr anchor noneditable emoticons template",

        // 工具栏
        toolbar: [
          "undo redo emoticons template | formatselect | bold italic underline strikethrough | codeformat blockformats | forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent |  removeformat ",
          "code  bullist numlist toc | lists image media table link | insertdatetime searchreplace anchor charmap pastetext"
        ],

        // 模板
        templates: templates
      }
    };
  },

  computed: {},

  watch: {},

  props: {},

  methods: {},

  created() {},

  mounted() {
    tinymce.init({});
  },

  beforeCreate() {},

  beforeMount() {},

  beforeUpdate() {},

  updated() {},

  beforeDestroy() {},

  destroyed() {},

  activated() {}
};
</script>

<style scoped>
</style>