<script setup>
import { ref, useTemplateRef } from 'vue';
import Versions from './components/Versions.vue'


const ipcHandle = () => window.electron.ipcRenderer.send('ping')
const infoText  = ref(`本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}) 和 Electron (v${versions.electron()})`);

console.log(versions.chrome())
// information.innerText = `本应用正在使用 Chrome (v${Versions.chrome()})`;

const func = async () => {
  const response = await window.versions.ping()
  console.log(response);
  window.myApi.setTitle("test title");

}

func();

console.log(window.myApi);

const title = ref("");

function setWinTtile() {
  window.myApi.setTitle(title.value);
}

const filePath = ref("");
async function openAFile() {
  const _filePath = await window.myApi.openFile();
  filePath.value = _filePath;
}

</script>

<template>
  <img alt="logo" class="logo" src="./assets/electron.svg" />
  <div class="creator">Powered by electron-vite</div>
  <div class="text">
    Build an Electron app with
    <span class="vue">Vue</span>
  </div>
  <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
  <p>👋</p>
  <div ref="info" class="info">{{ infoText }}</div>
  Title: <input v-model="title"></input>
  <el-button type="primary" @click="setWinTtile">Set</el-button>,
  <el-button type="primary" @click="openAFile()">Open a File</el-button>
  File path: <strong>{{ filePath }}</strong>

  <div class="actions">
    <div class="action">
      <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>
    </div>
  </div>
  <Versions />
</template>
<style lang="scss" scoped>
.info {
  background-color: green;
}
</style>