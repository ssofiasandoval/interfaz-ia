// importar modulos
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');

const OSC = require('osc-js');

const Server = require('./oscServer.js');
const options = require('./options.json');
const server = new Server(options);

const osc = new OSC();
osc.open();

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (!canceled) {
    return filePaths[0];
  }
}

async function getAppVersion() {
  return app.getVersion();
}

async function sendOSCMessage(event, address, value) {
  console.log(event, address, value);
  // let newMessage = new OSC.Message(address, value);
  // return osc.send(newMessage);
}

function createWindow () {
  // crear la ventana principal
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // carga index.html de la app
  mainWindow.loadFile('index.html');

  // abrir las herramientas de desarrollo
  mainWindow.webContents.openDevTools();

}

// este metodo sera llamado cuando Electron se haya inicializado
// y este listo para crear ventanas de navegador.
// algunas APIs solo pueden ser usadas despues de que este evento ocurra.
app.whenReady().then(() => {

  ipcMain.handle('dialog:openFile', handleFileOpen);
  ipcMain.handle('app:getVersion', getAppVersion);
  ipcMain.handle('osc:sendOSCMessage', sendOSCMessage);
  // ipcMain.handle('osc:sendOSCMessage', async (event, address, value) => {
  //   console.log(address, value);
  // });

  createWindow();

  server.start();
  server.hello();

  app.on('activate', function () {
    // en macOS es comun recrear una ventana en la app cuando
    // el icono del dock es clickeado y no hay otras ventanas abiertas.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
     } 
  })
})

// cierra la app cuando todas las ventanas se cierran, excepto en macOS.
// en macOs es comun que las aplicaciones se mantengan activas
// hasta que la persona usuaria cierre explicitamente con Cmd + Q 
app.on('window-all-closed', function () {

  server.stop();
  
  if (process.platform !== 'darwin') {
    app.quit();
  } 
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// intento json 20 octubre
// referencia https://www.easydevguide.com/posts/electron_json

// const filePath = path.join(app.getPath('userData'), 'assets/sliders.json')

// function saveData(data) {
//   const text = JSON.stringify(data)
//   fs.writeFile(filePath, text, err => {
//       if (err) {
//           console.error(err)
//       }
//   })
// }

// function readData() {
//   fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//           console.error(err);
//           return;
//       }
//     const parsedData = JSON.parse(data);
//       // handle the json data here
//       console.log(parsedData)
//   });
// }
