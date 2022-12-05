<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <transition name="fold">
        <span class="title" v-show="!isFolded">后台管理系统</span>
      </transition>
    </div>
    <el-menu
      text-color="#b7bdc3"
      active-text-color="#fff"
      background-color="#001529"
      :collapse="isFolded"
    >
      <template v-for="menu in userMenus" :key="menu.id">
        <!-- 1.系统总览 -->
        <el-sub-menu :index="menu.url">
          <template #title>
            <el-icon>
              <component
                :is="
                  menu.icon.split('-')[2] === 'chat'
                    ? 'ChatSquare'
                    : menu.icon.split('-')[2]
                "
              />
            </el-icon>
            <span>{{ menu.name }}</span>
          </template>
          <template v-for="subMenu in menu.children" :key="subMenu.id">
            <el-menu-item :index="subMenu.url">
              {{ subMenu.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup name="NavMenu">
import useLoginStore from '@/stores/login/login'
import { defineProps } from 'vue'

defineProps({
  isFolded: {
    type: Boolean,
    default: false
  }
})

const { userMenus } = useLoginStore()
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  user-select: none;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
      white-space: nowrap;
      user-select: none;
    }
  }
}
.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}

.fold-enter-from,
.fold-leave-to {
  opacity: 0;
}

.fold-enter-active,
.fold-leave-active {
  transition: all 0.3s linear;
}
</style>
