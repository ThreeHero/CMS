<template>
  <div class="layout">
    <el-container class="layout-content">
      <el-aside :width="isFolded ? '60px' : '210px'">
        <nav-menu :isFolded="isFolded" />
      </el-aside>
      <el-container>
        <el-header height="48px">
          <nav-header @changeFold="handleChangeFold" />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup name="layout">
import { ref } from 'vue'
import localCache from '@/utils/cache'
import NavMenu from './NavMenu/index.vue'
import NavHeader from './NavHeader/index.vue'

let isFolded = ref(localCache.getCache('isFold', false) ?? false)

// 改变折叠状态
const handleChangeFold = (isFold: boolean) => {
  isFolded.value = isFold
}
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100%;

  .layout-content {
    height: 100%;

    // 侧边栏
    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      // line-height: 200px;
      text-align: left;
      cursor: pointer;
      background-color: #001529;
      transition: width 0.3s linear;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */

      &::-webkit-scrollbar {
        display: none;
      }
    }

    // 主体区域
    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>
