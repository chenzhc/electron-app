<template>
    <div  class="sidebar-container">
        <el-form v-model="form" 
            size="small"
            class="formClass" >
            <el-form-item label="串口号:" prop="serialPort">
                <el-select v-model="form.serialPort" placeholder="请选择串口">
                    <el-option v-for="item in serialPortList"
                      :key="item.value"
                      :label="item.label" 
                      :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="波特率:" prop="rate">
                <el-select v-model="form.rate" placeholder="请选择串口">
                    <el-option v-for="item in rateList"
                      :key="item.value"
                      :label="item.label" 
                      :value="item.value" />
                </el-select>
            </el-form-item>
        </el-form>
        <div class="wrapper">
          <el-button type="primary" class="button">打开串口</el-button>
        </div>
        
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
import { ref, computed, onMounted } from 'vue';

const serialPortList = ref([]);
const form = ref({
  serialPort: null,
  rate: 9600,
});
// 2400 、4800、9600、19200、38400、57600、115200
const rateList = ref([
  {
    label: 2400,
    value: 2400,
  },
  {
    label: 4800,
    value: 4800,
  },
  {
    label: 9600,
    value: 9600,
  },
  {
    label: 19200,
    value: 19200,
  },
  {
    label: 38400,
    value: 38400,
  },
 {
    label: 57600,
    value: 57600,
  },
  {
    label: 115200,
    value: 115200,
  },
]);


function handleOpen() {

}

function handleClose() {

}

onMounted(async () => { 
  // let rsp = await window.myApi.showSpList();
  let rsp = await window.myApi.getSerialPortList();
  console.log("rsp: ", rsp);
  if(rsp!=null && rsp.length>0) {
      rsp.forEach((it)=> {
        serialPortList.value.push({
          label: it.path,
          value: it.path,
        });
      });
      if(serialPortList.value.length>0){
          form.value.serialPort = serialPortList.value[0].value;
      }
  }
});

</script>
<style lang="scss" scoped> 
.el-form-item {
  margin-bottom: 5px;
}
.el-menu--horizontal {
  --el-menu-horizontal-height: 50px;
}
.sidebar-container {
  background-color: whitesmoke;

  .wrapper {
    padding: 5px;

    .button {
      width: 100%;
    }
  }
  
  .scrollbar-wrapper {
    background-color: whitesmoke;
  }

}
</style>