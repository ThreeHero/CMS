<template>
  <div class="login-phone">
    <el-form :model="phone" :rules="rules">
      <el-form-item prop="number">
        <el-input
          class="login-ipt"
          v-model="phone.number"
          placeholder="手机号"
        />
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          class="login-code"
          v-model="phone.code"
          type="password"
          placeholder="验证码"
          :show-password="true"
        />
        <el-button class="login-get-code" type="primary">获取验证码</el-button>
      </el-form-item>
    </el-form>
    <div class="login">
      <el-button class="login-btn" type="primary">Login</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="LoginPhone">
import { reactive } from 'vue'

// 表单绑定
const phone = reactive({
  number: '',
  code: ''
})

// 验证规则
const rules = {
  number: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}
</script>

<style scoped lang="less">
.login-phone {
  .login-ipt {
    margin-top: 5px;
    width: 400px;
    height: 50px;
  }
  .login-code {
    margin-top: 5px;
    height: 50px;
    width: 200px;
  }
  .login-get-code {
    margin-top: 5px;
    height: 50px;
    width: 180px;
    margin-left: 20px;
  }
  .login {
    display: flex;
    justify-content: center;
    .login-btn {
      margin-top: 5px;
      width: 400px;
      height: 50px;
      letter-spacing: 5px;
    }
  }
}
/deep/.el-form-item__content {
  justify-content: center;

  .el-form-item__error {
    margin-left: 25px;
  }
}
</style>
