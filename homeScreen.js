const electron = require("electron");
const { ipcRenderer } = electron;

const btnRentBook = document.querySelector("#btn-rentbook");

btnRentBook.addEventListener("click", openRentBookWindow);

function openRentBookWindow() {
  ipcRenderer.send("openwindow:rentbook");
}

const btnAbout = document.querySelector("#btn-about");

btnAbout.addEventListener("click", openAboutWindow);

function openAboutWindow() {
  ipcRenderer.send("openwindow:about");
}
