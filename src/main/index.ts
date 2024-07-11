// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
import { app, BrowserWindow } from 'electron'
import serve from 'electron-serve'

import path from 'path'
import { fileURLToPath } from 'url'
import icon from '../../resources/icon.png?asset'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

let splashScreen
const appServe = app.isPackaged
  ? serve({
      directory: path.join(dirname, '../../out')
    })
  : null

const createWindow = (): void => {
  const win = new BrowserWindow({
    /*  width: 1440,
    height: 860, */
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: path.join(dirname, '../preload/index.mjs'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: true
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
