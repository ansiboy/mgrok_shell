const { app, Menu, Tray, BrowserWindow } = require('electron')
const electron = require('electron')
const path = require('path')
const url = require('url')
// const mgrok = require('./mgrok')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    // skipTaskbar: true,
    resizable: false
  })
  // mainWindow.webContents.openDevTools()
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  createTray(mainWindow)



  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
/**
 * @param {Electron.BrowserWindow} win 
 */
function createTray(win) {
  let tray = new Tray("content/image/20180316120341.png")

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Options', type: 'normal', icon: electron.nativeImage.createEmpty(),
      click() {

      }
    },
    {
      label: 'Show', type: 'normal', icon: electron.nativeImage.createEmpty(),
      click() {
        win.show()
      }
    },
    {
      label: 'Exits', type: 'normal', icon: electron.nativeImage.createEmpty(),
      click() {
        win.close()
      }
    },
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  tray.on('click', function () {
    if (win.isVisible()) {
      win.hide()
    } else {
      win.show()
    }

  })
  win.on('close', () => tray.destroy())
}