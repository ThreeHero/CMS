<template>
  <div class="PageSearch">
    <th-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btn">
          <el-button icon="refresh" @click="handleResetClick"> 重置 </el-button>
          <el-button type="primary" icon="search" @click="handleQueryClick">
            搜索
          </el-button>
        </div>
      </template>
    </th-form>
  </div>
</template>

<script lang="ts" setup name="PageSearch">
import ThForm from '@/components/form'
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['resetBtnClick', 'queryBtnClick'])

const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)

// 2.优化二: 当用户点击重置
const handleResetClick = () => {
  // for (const key in formOriginData) {
  //   formData.value[`${key}`] = formOriginData[key]
  // }
  formData.value = formOriginData
  emit('resetBtnClick')
}

// 3.优化三: 当用户点击搜索
const handleQueryClick = () => {
  emit('queryBtnClick', formData.value)
}
</script>

<style scoped lang="less">
.header {
  color: skyblue;
  margin: 0 0 20px 20px;
}
.handle-btn {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
