<template>
  <div class="login-panel">
    <h2 class="login-title">后台管理系统</h2>
    <el-tabs class="login-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon class="icon"><User /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <!-- 账号登录 -->
        <login-account />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon class="icon"><Cellphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <!-- 手机登录 -->
        <login-phone />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup name="LoginPanel">
import { ref } from 'vue'
import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'

const currentTab = ref('account')
</script>

<style scoped lang="less">
.login-panel {
  .login-title {
    margin: 16px 0;
    text-align: center;
    color: #219dce;
    letter-spacing: 5px;
    user-select: none;
  }
  .login-tabs {
    width: 100%;
    .custom-tabs-label {
      user-select: none;
      letter-spacing: 2px;
      .icon {
        margin-right: 6px;
        transform: translateY(2px);
      }
    }

    /deep/.el-tabs__item.is-active {
      color: #219dee;
    }
  }
}
</style>
