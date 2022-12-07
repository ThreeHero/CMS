<template>
  <div>
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <div class="page-content"></div>
  </div>
</template>

<script lang="ts" setup name="user">
import PageSearch from './components/PageSearch.vue'
import { searchFormConfig } from './config/search.config'

const handleResetClick = () => {
  console.log('handleResetClick')
}
const handleQueryClick = () => {
  console.log('handleQueryClick')
}
</script>

<style scoped lang="less"></style>
