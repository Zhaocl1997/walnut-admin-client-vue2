<template>
  <div class="signin">
    <div class="signin-con">
      <div class="signin-con-header">
        <img src="img/signinlogo.png" alt />
      </div>

      <br />
      <router-link to="/signup">signup</router-link>
      <br />
      <router-link to="/index">index</router-link>

      <el-form
        ref="signinForm"
        status-icon
        :rules="rules"
        :model="signinData"
        @submit.native.prevent
      >
        <el-form-item prop="phone">
          <el-input
            type="text"
            v-model="signinData.phone"
            placeholder="请输入手机号或邮箱"
            clearable
            prefix-icon="el-icon-user-solid"
            style="width:330px;"
            @keyup.enter.native="onSignin"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="signinData.password"
            placeholder="请输入密码"
            clearable
            style="width:330px;"
            @keyup.enter.native="onSignin"
          ></el-input>
        </el-form-item>

        <!-- <el-checkbox v-model="checked" class="signin-con-savePass">记住密码</el-checkbox> -->

        <el-button
          type="primary"
          style="width:330px;"
          class="signin-con-btn"
          @click="onMock"
        >模&nbsp;拟</el-button>

        <el-button
          type="primary"
          style="width:330px;"
          class="signin-con-btn"
          @click="onSignin"
        >登&nbsp;录</el-button>

        <router-link to="/signup" class="signin-con-signup">免费注册</router-link>

        <!-- <div class="signin-con-findpass">
          <el-dropdown trigger="click" @command="onCommand">
            <span class="el-dropdown-link">找回密码</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="phone">手机找回</el-dropdown-item>
              <el-dropdown-item command="email">邮箱找回</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>-->
      </el-form>
    </div>
  </div>
</template>

<script>
import { signin } from "@/api";
import { mockSigninData } from "@/utils/mock";

export default {
  name: "wSignin",

  components: {},

  mixins: [],

  data() {
    return {
      signinData: {},
      rules: {}
    };
  },

  computed: {},

  watch: {},

  props: {},

  methods: {
    onSignin() {
      this.$store
        .dispatch("Signin", this.signinData)
        .then(() => {
          console.log(123);
        })
        .catch(() => {
          console.log(312);
          // this.loading = false;
          // this.getCode();
        });
    },

    onMock() {
      console.log(mockSigninData);
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
.signin {
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
.signin-con {
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
.signin-con-header > img {
  margin-top: 30px;
  width: 300px;
  margin-bottom: 30px;
}
.signin-con-btn {
  position: relative;
  top: 30px;
  right: 0;
}
.signin-con-savePass {
  position: absolute;
  bottom: 170px;
  left: 20px;
}
.signin-con-signup {
  position: absolute;
  bottom: 90px;
  left: 20px;
  color: #777;
}
.signin-con-findpass {
  cursor: pointer;
  position: absolute;
  bottom: 90px;
  right: 20px;
  color: #777;
}
</style>