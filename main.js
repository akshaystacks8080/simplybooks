//import statements
const electron = require("electron");
const url = require("url");
const path = require("path");

//gets object from the electron object and stores inside the variable(destructuring)
const { app, BrowserWindow } = electron;

//declares the main window
let mainWindow;

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

app.on("ready", onReady);
