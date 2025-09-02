<script setup >
import { RouterView } from 'vue-router';
import Sidebar from '@renderer/layout/components/Sidebar';

</script>

<template>
  <div style="height: 100vh; box-shadow: var(--el-border-color-light) 0px 0px 10px" >
    <el-splitter>
      <el-splitter-panel :resizable="false" size="200">
        <Sidebar></Sidebar>
      </el-splitter-panel>
      <el-splitter-panel :min="200">
        <RouterView />
      </el-splitter-panel>
    </el-splitter>
  </div>
</template>

<style scoped>
.demo-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>