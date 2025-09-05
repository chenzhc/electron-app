import { app, shell, BrowserWindow, Menu, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset';
import { SerialPort } from 'serialport';

// 获取串口列表
async function showPortList() {
  const ports = await SerialPort.list()
  // console.log("showPortList: ",ports);
  return ports;
}

function handleSetTitle(event, title) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);

}

async function handleFileOpne() {
  const { canceled, filePaths }  = await dialog.showOpenDialog();
  if(!canceled) {
    return filePaths[0];
  }
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1260,
    height: 850,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment',
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement',
        }
      ]
    }
  ]);

  // Menu.setApplicationMenu(menu);
  

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // 打开 DevTools，默认位置
  mainWindow.webContents.openDevTools({mode:'undocked'})

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'));
  ipcMain.on('set-title', handleSetTitle);
  ipcMain.on('counter-value', (_event, value) => {
    console.log(value);
  })

  // ipcMain.on('port', (event) => {
  //   const port = event.ports[0];

  //   port.on('message', (event) => {
  //     const data = event.data;
  //     console.log(data);
  //   })

  //   port.start();
  // })

  ipcMain.handle('dialog:openFile', handleFileOpne);
  ipcMain.handle('ping', () => 'pong');
  ipcMain.handle('getPortList', showPortList);

  ipcMain.on('show-splist', async (event, arg) => {
      let portList = await showPortList();
      event.returnValue = portList;
  });
  ipcMain.on('asynchronous-message', (event, arg) => {
    // console.log("main: " + arg);

    event.reply('asynchronous-reply', 'pong');
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })


  if(process.platform === 'linux') {
    app.commandLine.appendSwitch('--no-sandbox')
  }
})



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
console.log('Hello from Electron 👋')