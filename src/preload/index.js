import { contextBridge, ipcMain, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}
const versions = {
      node: () => process.versions.node,
      chrome: () => process.versions.chrome,
      electron: () => process.versions.electron,
      ping: () => ipcRenderer.invoke('ping'),
    };

const myApi = {
    desktop: true,
    setTitle: (title) => ipcRenderer.send('set-title', title),
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => {
      return callback(value)
    }),
    counterValue: (value) => ipcRenderer.send('counter-value', value),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('versions', versions);
    contextBridge.exposeInMainWorld('myApi', myApi);
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
  window.versions = versions;
  window.myApi = myApi;
  
}

ipcRenderer.on("asynchronous-reply", (_event, arg) => {
  console.log("preload: " + arg);
})
ipcRenderer.send("asynchronous-message", 'ping');

