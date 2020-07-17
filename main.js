//import statements
const electron = require("electron");
const url = require("url");
const path = require("path");
const { ipcMain, protocol } = require("electron");

//gets object from the electron object and stores inside the variable(destructuring)
const { app, BrowserWindow } = electron;

//declares the main window
let mainWindow;
let rentBookWindow;
let aboutBookWindow;

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
    pathname: path.join(__dirname, "homeScreen.html"),
    protocol: "file",
    slashes: true,
  };

  //close all windows when we exit main window
  mainWindow.on("closed", () => app.quit());

  //generates the url for loading the html file
  const mainWindowUrl = url.format(mainWindowParams);

  //loads the window
  mainWindow.loadURL(mainWindowUrl);
}

function loadRentBookWindow() {
  rentBookWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const rentBookWindowUrl = url.format({
    pathname: path.join(__dirname, "rentBook.html"),
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
    pathname: path.join(__dirname, "about.html"),
    protocol: "file",
    slashes: true,
  });

  aboutBookWindow.loadURL(aboutWindowUrl);
}

app.on("ready", onReady);

ipcMain.on("openwindow:rentbook", loadRentBookWindow);
ipcMain.on("openwindow:about", loadAboutWindow);
