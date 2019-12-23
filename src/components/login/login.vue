<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.admAccount"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.admPassword"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="formdata.verificationCode"></el-input>
        <!-- <img src="127.0.0.1:8080/verificationCode/getCode" alt="点击刷新验证码" /> -->
        <!-- <div class="img" v-html="url">{{url}}</div>
        <img :src="url" alt=""> -->
      </el-form-item>
      <el-button @click.prevent="handleLogin()" class="login-btn" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        admAccount: '',
        admPassword: '',
        verificationCode: ''
      },
      url: ''
    }
  },
  created () {
    // this.grtCode()
  },
  methods: {
    async handleLogin () {
      const res = await this.$http.post('admin/adminLogin', this.formdata)
      console.log(res)
      const {
        data,
        meta: { retCode, retMsg }
      } = res.data
      // 登陆成功
      // 1.跳转home
      if (retCode === 'CODE0002') {
        // 保存token值
        localStorage.setItem('token', data.token)
        // 2.提示成功
        this.$message.success(retMsg)
        // 跳转页面
        this.$router.push({ name: 'home' })
      } else {
        // 登陆不成功
        // 1.提示消息
        this.$message.warning(retMsg)
      }
    }
    // async grtCode () {
    //   const res = await this.$http.get('verificationCode/getCode')
    //   console.log(res)
    //   const { data } = res.data
    //   this.url = 'data:image/jpeg;base64,' + data
    // }
  }
}
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
.img {
    display: inline-block;
    height: 100%;
}
</style>
