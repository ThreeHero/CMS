<template>
  <div>
    Login
    <div>{{ userStore.name }}</div>
  </div>
</template>

<script lang="ts" setup name="Login">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<style scoped></style>
