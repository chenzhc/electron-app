<script setup >
import { RouterView } from 'vue-router';
import Sidebar from '@renderer/layout/components/Sidebar';

</script>

<template>
  <div style="height: 100vh; box-shadow: var(--el-border-color-light) 0px 0px 10px" >
    <el-container>
        <el-aside width="200px">
            <Sidebar></Sidebar>
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
    </el-container>
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