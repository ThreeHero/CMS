<template>
  <div class="HeaderInfo">
    <el-dropdown>
      <span style="cursor: pointer">
        {{ login.userInfo.name }}
        <el-icon>
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup name="HeaderInfo">
import useLoginStore from '@/stores/login/login'

const login = useLoginStore()
</script>

<style scoped lang="less"></style>
