<template>
  <div class="login-container">
    <!-- 登录标题区域 -->
    <div class="title">
      <h3>Login From</h3>
    </div>
    <!-- 登录表单验证区域 -->
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="0px">
      <!-- 登录用户 -->
      <el-form-item class="username" prop="username">
        <el-input prefix-icon="el-icon-user-solid" 
                  v-model="loginForm.username" 
                  placeholder="请输入登录账号"></el-input>
      </el-form-item>
      <!-- 登录密码 -->
      <el-form-item class="password" prop="password">
        <el-input prefix-icon="el-icon-unlock" 
                  v-model="loginForm.password" 
                  placeholder="请输入登录密码" 
                  type="password"></el-input>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-form-item class="loginBtn">
        <el-button type="primary" @click="login">Login</el-button>
        <el-button type="info" @click="resetForm">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getLogin} from 'network/login.js'

export default {
  name: 'LoginContainer',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入账号密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 重置表单
    resetForm() {
      this.$refs.loginFormRef.resetFields()
      this.$message.success("已重置")
    },
    /// 点击登录，预验证
    login() {

      // 没封装
      // this.$refs.loginFormRef.validate(async valid => {
      //   if(!valid) return;
      //   const {data: res} = await this.$http.post("login", this.loginForm)
      //   if(res.meta.status !== 200) return this.$message.error("Failed user login")
      //   this.$message.success("Login successfully")
      //   // 登录成功后保存token
      //   window.localStorage.setItem('token', res.data.token)
      //   // 跳转到后台主页
      //   this.$router.push('/home')
      // })
      // 封装
      getLogin(this.loginForm.username, this.loginForm.password).then(res => {
        console.log(res)
        // 判断状态码是否为200
        if(res.data.meta.status !== 200) return this.$message.error("Failed user login")
        this.$message.success("Login successfully")
        // 登录成功后保存token
        window.localStorage.setItem('token', res.data.data.token)
        // 跳转到后台主页
        this.$router.push('/home')
      })
    }
  }
};
</script>

<style scoped>
  .login-container {
    width: 450px;
    height: 300px;
    /* background-color: #fff; */
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* padding: 0 20px; */
  }
  
  .title {
    height: 50px;
    line-height: 50px;
    font-size: 25px;
    text-align: center;
    color: #fff;
    margin-bottom: 30px;
  }

  .loginBtn {
    display: flex;
    justify-content: flex-end;
  }
</style>