<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
      <h2>管理员登录</h2>
      <el-form-item>
        <el-input placeholder="请输入账号" v-model="formdata.admAccount"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入密码" v-model="formdata.admPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入验证码" v-model="formdata.verificationCode">
          <template slot="append">
            <img :src="url" alt="点击刷新验证码" @click="getCode()"/>
          </template>
        </el-input>

        <!-- <div class="img" v-html="url">{{url}}</div>
        <img :src="url" alt="">-->
      </el-form-item>
      <el-button @click.prevent="handleLogin()" class="login-btn" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        admAccount: "",
        admPassword: "",
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
      const res = await this.$http.post("admin/adminLogin", this.formdata);
      console.log(res);
      const {
        data,
        meta: { retCode, retMsg }
      } = res.data;
      // 登陆成功
      // 1.跳转home
      if (retCode == "ADMIN0000") {
        // 保存token值
        localStorage.setItem("token", data.token);
        // 2.提示成功
        this.$message.success(retMsg);
        // 跳转页面
        this.$router.push({ name: "home" });
      } else {
        // 登陆不成功
        // 1.提示消息
        this.$message.warning(retMsg);
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
