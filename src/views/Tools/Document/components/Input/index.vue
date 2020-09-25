<template>
  <div class="center-item">
    <p>w-input 当前绑定值：{{ input1 }}</p>
    <w-input v-model="input1" placeholder="普通输入框" clearable tooltip block>
      <w-icon class="pointer" icon="file-copy" slot="append" @click="onCopy"></w-icon>
    </w-input>

    <p>w-input 当前绑定值：{{ input2 }}</p>
    <w-input
      v-model="input2"
      type="textarea"
      :rows="3"
      show-limit
      :maxlength="100"
      :minlength="20"
      placeholder="普通文本域"
    ></w-input>

    <p>w-input 当前绑定值：{{ input3 }}</p>
    <w-input v-model="input3" type="number" placeholder="数字输入框" :step="5"></w-input>

    <p>w-input 当前绑定值：{{ input4 }}</p>
    <w-input v-model="input4" type="letter" placeholder="字母输入框"></w-input>

    <p>w-input 当前绑定值：{{ input5 }}</p>
    <w-input v-model="input5" type="chinese" placeholder="汉字输入框" suffix-icon="el-icon-edit"></w-input>

    <p>w-input 当前绑定值：{{ input6 }}</p>
    <w-input v-model="input6" type="password" placeholder="密码输入框" clearable show-pass-icon>
      <w-button
        slot="append"
        icon="el-icon-question"
        popover
        popover-title="提示"
        popover-content="密码中必须包含大小写字母、数字、特殊字符"
      ></w-button>
    </w-input>

    <p>w-input 当前绑定值：{{ input7 }}</p>
    <w-input v-model="input7" type="phone" placeholder="手机号输入框" clearable>
      <div slot="prepend">+86</div>
    </w-input>

    <p>w-input 当前绑定值：{{ input8 }}</p>
    <w-input v-model="input8" type="email" placeholder="邮箱输入框" clearable></w-input>

    <p>w-input 当前绑定值：{{ input9 }}</p>
    <w-input v-model="input9" type="id" placeholder="身份证号输入框" clearable></w-input>
  </div>
</template>

<script>
import wButton from "@/components/UI/Button";
import wInput from "@/components/UI/Input";

export default {
  name: "",

  components: { wButton, wInput },

  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
      input7: "",
      input8: "",
      input9: "",
      input10: "",
      input11: ""
    };
  },

  computed: {},

  watch: {},

  props: {},

  methods: {
    onCopy() {
      this.$copy({ text: this.input1 }).then(() => {
        this.$message.success("复制成功");
      });
    }
  },

  created() {},

  mounted() {},

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