// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import serve from 'electron-serve'

import path from 'path'
import { fileURLToPath } from 'url'
import icon from '../../resources/icon.png?asset'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

let splashScreen
let win

const appServe = app.isPackaged
  ? serve({
      directory: path.join(dirname, '../../out')
    })
  : null

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('electron-fiddle', process.execPath, [
      path.resolve(process.argv[1])
    ])
  }
} else {
  app.setAsDefaultProtocolClient('electron-fiddle')
}

const createWindow = (): void => {
  win = new BrowserWindow({
    /*  width: 1440,
    // height: 860, */
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: path.join(dirname, '../preload/index.mjs'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(dirname, '../../resources/icon.png'),
    show: false
  })
  splashScreen = new BrowserWindow({
    width: 320,
    height: 320,
    transparent: false,
    frame: false,
    alwaysOnTop: false,
    icon: path.join(dirname, '../resources/icon.png')
  })
  splashScreen.loadFile(path.join(dirname, '../../splash/splashscreen.html'))
  if (app.isPackaged && appServe) {
    appServe(win).then(() => {
      win.loadURL('app://-')
    })
  } else {
    win.loadURL('http://localhost:5173')
    win.webContents.openDevTools()
    win.webContents.on('did-fail-load', () => {
      win.webContents.reloadIgnoringCache()
    })
    win.webContents.on('did-stop-loading', () => {
      splashScreen.destroy()
      win.show()
      win.maximize()
    })
    win.webContents.on('ready-to-show', () => {
      splashScreen.destroy()
    })
  }
}

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (_event, commandLine) => {
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
      splashScreen.destroy()
    }
    dialog.showErrorBox('Welcome Back', `You arrived from: ${commandLine.pop()}`)
  })

  app.whenReady().then(() => {
    createWindow()
  })
}
let deeplinkingUrl
app.on('open-url', function (event, url) {
  event.preventDefault()
  deeplinkingUrl = url.split('//')[1]
  win.webContents.send('navigate', deeplinkingUrl)
  splashScreen.destroy()
})
ipcMain.on('navigate', (event, url) => {
  event.preventDefault()
  win.loadURL(url)
  splashScreen.destroy()
})
