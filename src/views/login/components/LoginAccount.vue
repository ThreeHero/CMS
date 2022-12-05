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
        <el-checkbox
          label="记住密码"
          @change="rememberPassword"
          v-model="isKeepPassword"
        />
        <el-link type="primary" :underline="false">忘记密码</el-link>
      </div>
      <el-button class="login-btn" type="primary" @click="handleLogin"
        >Login</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts" name="LoginAccount">
import type { ElForm } from 'element-plus'
import useLoginStore from '@/stores/login/login'
import { reactive, ref } from 'vue'
import localCache from '@/utils/cache'

// 表单绑定
const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: ''
})
// 验证规则
const rules = {
  name: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\w{6,18}$/,
      message: '长度在6~18之间，只能包含字母、数字和下划线',
      trigger: 'blur'
    }
  ]
}

// 记住密码
const isKeepPassword = ref(localCache.getCache('isKeepPassword', false) ?? true)
const rememberPassword = () => {
  localCache.removeCache('isKeepPassword', false)
  localCache.setCache('isKeepPassword', isKeepPassword.value, false)
}

// 每次载入判断是否记住密码
if (isKeepPassword.value) {
  account.password = localCache.getCache('password') ?? ''
}

// 登录
const loginStore = useLoginStore()
const formRef = ref<InstanceType<typeof ElForm>>()
const handleLogin = () => {
  // 表单校验
  formRef.value?.validate((isOK) => {
    if (isOK) {
      const name = account.name
      const password = account.password
      // 判断是否记住密码
      if (isKeepPassword.value) {
        localCache.removeCache('name')
        localCache.removeCache('password')

        localCache.setCache('name', name)
        localCache.setCache('password', password)
      }
      // 登录验证
      loginStore.accountLoginAction({ name, password })
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
