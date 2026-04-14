const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

// Determinar si estamos en desarrollo
const isDev = process.env.NODE_ENV === 'development'

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    // icon: path.join(__dirname, '../ui/assets/icon.png'),
    title: 'Sistema de Gestión de Files Únicos',
    show: false, // No mostrar hasta que esté listo
  })

  // Mostrar cuando esté listo
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Cargar la aplicación
  if (isDev) {
    // En desarrollo: cargar desde Vite dev server
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    // En producción: cargar desde archivos compilados
    mainWindow.loadFile(path.join(__dirname, '../../../dist/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // Manejar errores de carga
  mainWindow.webContents.on('did-fail-load', () => {
    console.error('Failed to load application')
    if (isDev) {
      setTimeout(() => {
        mainWindow.loadURL('http://localhost:5173')
      }, 1000)
    }
  })
}

// Inicializar la aplicación
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Log para debugging
console.log('Electron app started')
console.log('Environment:', isDev ? 'development' : 'production')
console.log('App path:', app.getAppPath())