<template>
    <div  class="sidebar-container">
      <el-menu>
        <el-menu-item index="1">
          <el-icon></el-icon>
          <template #title>
            <router-link to="/index">Home</router-link>
          </template>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon></el-icon>
          <template #title>
            <router-link to="/about">About</router-link>
          </template>
        </el-menu-item>
      </el-menu>
        
    </div>
</template>
<script setup>
import {
  Plus,
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
  Refresh,
  Menu
} from '@element-plus/icons-vue';
import { ref, computed } from 'vue';

function handleOpen() {

}

function handleClose() {

}

const getMenuBackground = computed(() => {
  return "$theme-dark";
});
</script>
<style lang="scss" scoped> 
@use '@renderer/assets/styles/variables.module.scss' as vars;

.el-menu--horizontal {
  --el-menu-horizontal-height: 50px;
}
.sidebar-container {
  background-color: vars.$base-menu-background;
  
  .scrollbar-wrapper {
    background-color: vars.$base-menu-background;
  }

  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
    
    .el-menu-item, .el-sub-menu__title {
      &:hover {
        background-color: var(--menu-hover, rgba(0, 0, 0, 0.06)) !important;
      }
    }

    .el-menu-item {
      color: v-bind(getMenuTextColor);
      height: 30px;
      
      &.is-active {
        color: var(--menu-active-text, #409eff);
        background-color: var(--menu-hover, vars.$base-menu-background) !important;
      }
    }

    .el-sub-menu__title {
      color: v-bind(getMenuTextColor);
    }
  }
}
</style>