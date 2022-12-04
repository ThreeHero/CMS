<template>
  <div class="login-account">
    <el-form :model="account" :rules="rules" ref="formRef">
      <el-form-item prop="name">
        <el-input
          class="login-ipt"
          v-model="account.name"
          placeholder="账号"
          autofocus
          @keyup.enter="handleLogin"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          class="login-ipt"
          v-model="account.password"
          type="password"
          placeholder="密码"
          :show-password="true"
          @keyup.enter="handleLogin"
        />
      </el-form-item>
    </el-form>
    <div class="account-control">
      <div class="login-remember">
        <el-checkbox label="记住密码" />
        <el-link type="primary" :underline="false" v-model="isKeepPassword"
          >忘记密码</el-link
        >
      </div>
      <el-button class="login-btn" type="primary" @click="handleLogin"
        >Login</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts" name="LoginAccount">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

const formRef = ref<InstanceType<typeof ElForm>>()
// 表单绑定
const account = reactive({
  name: '',
  password: ''
})
// 验证规则
const rules = {
  name: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z]\w{5,17}$/,
      message: '请以字母开头，长度在6~18之间，只能包含字母、数字和下划线',
      trigger: 'blur'
    }
  ]
}

// 记住密码
const isKeepPassword = ref(false)

// 登录
const handleLogin = () => {
  // 表单校验
  formRef.value?.validate((isOK) => {
    if (isOK) {
      console.log(formRef.value)
    }
  })
}
</script>

<style scoped lang="less">
.login-account {
  user-select: none;
  .login-ipt {
    // margin-top: 5px;
    width: 400px;
    height: 50px;
  }
  .account-control {
    display: flex;
    flex-direction: column;
    align-items: center;
    .login-remember {
      width: 87%;
      display: flex;
      justify-content: space-between;
      margin-top: -10px;
      margin-left: 25px;
      align-self: flex-start;
    }
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