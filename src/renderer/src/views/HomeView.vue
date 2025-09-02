
<script setup name="HomeView">
import { ref } from 'vue';

const filePathUrl = ref(undefined);
const counter = ref(0);
// const channel = new MessageChannel();

// const port1 = channel.port1;
// const port2 = channel.port2;

// port2.postMessage({ answer: 42 });

// ipcRenderer.postMessage('port', null, [port1]);

window.myApi.onUpdateCounter((value) => {
    const oldValue = Number(counter.value);
    const newValue = oldValue + value;
    counter.value = newValue.toString();
    window.myApi.counterValue(newValue);

})

async function openFile() {
    const filePath = await window.myApi.openFile();
    filePathUrl.value = filePath;
}


</script>
<template>
    <el-button type="primary" @click="openFile">Btn</el-button>
    <br/>
    <el-text>File Path: {{ filePathUrl }}</el-text>
    <br/>
    <el-text>Current value: <strong>{{ counter }}</strong></el-text>
</template>
<style lang="scss" scoped>

</style>