<template>
  <div class="nav-header">
    <div class="menu-icon" @click="handleFoldClick">
      <el-icon size="24px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup name="NavHeader">
import { ref, defineEmits } from 'vue'
import localCache from '@/utils/cache'

const emit = defineEmits(['changeFold'])

const isFold = ref(localCache.getCache('isFold', false) ?? false)
const handleFoldClick = () => {
  isFold.value = !isFold.value
  // 将折叠状态存入session
  localCache.setCache('isFold', isFold.value, false)
  // 通知父组件
  emit('changeFold', isFold.value)
}
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
