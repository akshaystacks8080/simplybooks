//import statements
const electron = require("electron");
const url = require("url");
const path = require("path");
const { ipcMain, protocol } = require("electron");

//gets object from the electron object and stores inside the variable(destructuring)
const { app, BrowserWindow, Menu } = electron;

//declares the main window
let mainWindow;
let rentBookWindow;
let aboutBookWindow;
let viewBooksWindow;

//Initial Function when app is loaded
function onReady() {
  //setting parameters for browser window
  const BrowserWindowParams = {
    webPreferences: {
      nodeIntegration: true,
    },
  };

  //creates new browser window
  mainWindow = new BrowserWindow(BrowserWindowParams);

  //generates file html url
  const mainWindowParams = {
    pathname: path.join(__dirname, "src/homeScreen.html"),
    protocol: "file",
    slashes: true,
  };

  //close all windows when we exit main window
  mainWindow.on("closed", () => app.quit());

  //generates the url for loading the html file
  const mainWindowUrl = url.format(mainWindowParams);

  //loads the window
  mainWindow.loadURL(mainWindowUrl);

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

function loadRentBookWindow() {
  rentBookWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const rentBookWindowUrl = url.format({
    pathname: path.join(__dirname, "src/rentBook.html"),
    protocol: "file",
    slashes: true,
  });

  rentBookWindow.loadURL(rentBookWindowUrl);
}

function loadAboutWindow() {
  aboutBookWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const aboutWindowUrl = url.format({
    pathname: path.join(__dirname, "src/about.html"),
    protocol: "file",
    slashes: true,
  });

  aboutBookWindow.loadURL(aboutWindowUrl);
}

function loadViewBooksWindow() {
  viewBooksWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const viewBooksWindowUrl = url.format({
    pathname: path.join(__dirname, "src/viewBooks.html"),
    protocol: "file",
    slashes: true,
  });

  viewBooksWindow.loadURL(viewBooksWindowUrl);
}

app.on("ready", onReady);

ipcMain.on("openwindow:rentbook", loadRentBookWindow);
ipcMain.on("openwindow:about", loadAboutWindow);
ipcMain.on("openwindow:viewbooks", loadViewBooksWindow);

const mainMenuTemplate = [
  {
    label: "Developer Tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click: function (item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: "reload",
      },
    ],
  },
];

if (process.platform == "darwin") {
  mainMenuTemplate.unshift({ label: "" });
}
