'use strict'

import { app, Menu, Tray, BrowserWindow } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let tray = null
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  if (process.env.NODE_ENV === 'development') {
  }

  // mainWindow.on('closed', () => {
  //   mainWindow = null
  // })

  mainWindow.on('close', (event) => {
    mainWindow.hide()
    mainWindow.setSkipTaskbar(true)
    event.preventDefault()
  })

  mainWindow.on('show', () => {
    tray.setHighlightMode('always')
  })

  mainWindow.on('hide', () => {
    tray.setHighlightMode('never')
  })

  const menubarPic = process.platform === 'darwin' ? `${__static}/menubar.png` : `${__static}/menubar-nodarwin.png`
  tray = new Tray(menubarPic)
  const contextMenu = Menu.buildFromTemplate([
    {label: '退出', click: () => { mainWindow.destroy() }}
  ])
  tray.setToolTip('Tray')
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    mainWindow.isVisible() ? mainWindow.setSkipTaskbar(false) : mainWindow.setSkipTaskbar(true)
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
