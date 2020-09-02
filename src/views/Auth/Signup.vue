<template>
  <div class="signup">
    <div class="signup-con">
      <div class="signup-con-header">
        <img src="img/loginlogo.png" alt />
      </div>

      <br />
      <router-link to="/signin">signin</router-link>
      <br />
      <router-link to="/index">index</router-link>

      <!-- <el-form ref="signupForm" :rules="rules" :model="signupData">
        <el-form-item prop="name">
          <el-input
            type="text"
            v-model="signupData.name"
            placeholder="请输入昵称，长度应在3-12位"
            clearable
            prefix-icon="el-icon-user-solid"
            minlength="3"
            maxlength="12"
            style="width:330px;"
          ></el-input>
        </el-form-item>

        <v-check-pass v-model="signupData.password"></v-check-pass>
        <v-phone v-model="signupData.phone"></v-phone>
        <v-code v-model="signupData.code" type="phone" :info="signupData.phone"></v-code>

        <el-button
          type="primary"
          style="width:330px;"
          class="signup-con-btn"
          @keyup.enter.native="onsignup"
          @click="onsignup"
        >注&nbsp;册</el-button>

        <router-link to="/login" class="signup-con-login">立即登录</router-link>
      </el-form>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "wSignup",

  components: {},

  mixins: [],

  data() {
    return {};
  },

  computed: {},

  watch: {},

  props: {},

  methods: {},

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
.signup {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background: linear-gradient(
    to right bottom,
    rgba(126, 213, 111, 0.6),
    rgba(40, 180, 133, 0.6)
  );
  text-align: center;
}
.signup-con {
  padding: 15px;
  background: white;
  border-radius: 30px;
  box-shadow: 5px 5px 5px black;

  height: 560px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.signup-con-header > img {
  margin-top: 30px;
  width: 300px;
}
.signup-con-login {
  position: absolute;
  bottom: 10px;
  right: 20px;
  color: #777;
}
</style>