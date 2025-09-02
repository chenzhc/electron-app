<template>
    <div  class="sidebar-container">
        
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

function handleOpen() {

}

function handleClose() {

}
</script>
<style lang="scss" scoped>
.sidebar-container {
  background-color: v-bind(getMenuBackground);
  
  .scrollbar-wrapper {
    background-color: v-bind(getMenuBackground);
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
      
      &.is-active {
        color: var(--menu-active-text, #409eff);
        background-color: var(--menu-hover, rgba(0, 0, 0, 0.06)) !important;
      }
    }

    .el-sub-menu__title {
      color: v-bind(getMenuTextColor);
    }
  }
}
</style>