<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
      <h2 style="text-align:center;">教师登录</h2>
      <el-form-item prop="tNumber">
        <el-input
          placeholder="请输入账号"
          ref="tNumber"
          autocomplete="on"
          v-model="formdata.tNumber"
        ></el-input>
      </el-form-item>
      <el-form-item prop="tPassword">
        <el-input
          placeholder="请输入密码"
          ref="tPassword"
          autocomplete="on"
          v-model="formdata.tPassword"
        ></el-input>
      </el-form-item>
      <el-form-item prop="verificationCode">
        <el-input
          placeholder="请输入验证码"
          ref="verificationCode"
          autocomplete="on"
          v-model="formdata.verificationCode"
          @keyup.enter.native="handleLogin"
        >
          <template slot="append">
            <img :src="url" alt="点击刷新验证码" @click="getCode()" />
          </template>
        </el-input>

        <!-- <div class="img" v-html="url">{{url}}</div>
        <img :src="url" alt="">-->
      </el-form-item>
      <el-button @click.prevent="handleLogin()" class="login-btn" type="primary">登录</el-button>
      <el-row style="margin-top:10px;">
        <el-col :span="8">
         <div class="grid-content bg-purple-dark" ><el-button type="info" plain @click=" $router.push({name:'teachersignup'})">教师注册</el-button></div>
        </el-col>
        <el-col :span="8" :offset="8">
         <div class="grid-content bg-purple-dark" style="text-align:right;"><el-button type="info" plain @click.prevent=" $router.push({name:'teacherresetpsd'})">找回密码</el-button></div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        tNumber: "10002",
        tPassword: "123456",
        verificationCode: ""
      },
      url: ""
    };
  },
  created() {
    this.getCode();
  },
  methods: {
    async handleLogin() {
      console.log(this.formdata);
      const res = await this.$http.post("teacher/teacherLogin", this.formdata);
      const data = res.data;
      console.log(data);
      // 登陆成功
      // 1.跳转home
      if (data.retCode == "TEA00000") {
        // 保存token值
        localStorage.setItem("token", data.retCode);
        // 2.提示成功
        this.$message.success(data.retMsg);
        // 跳转页面
        this.$router.push({ name: "home" });
      } else {
        // 登陆不成功
        // 1.提示消息
        this.$message.warning(data.retMsg);
      }
    },
    async getCode() {
      const imageBuffer = await this.$http.get("verificationCode/getCode", {
        responseType: "arraybuffer"
      });
      let bytes = new Uint8Array(imageBuffer.data);
      let data = "";
      let len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        data += String.fromCharCode(bytes[i]);
      }
      this.url = "data:image/png;base64," + window.btoa(data);
    }
  }
};
</script>

<style>
.login-wrap {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
}
.login-wrap .login-btn {
  width: 100%;
}
</style>
