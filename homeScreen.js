const electron = require("electron");
const { ipcRenderer } = electron;

const btnRentBook = document.querySelector("#btn-rentbook");
const btnAbout = document.querySelector("#btn-about");

btnRentBook.addEventListener("click", openRentBookWindow);
btnAbout.addEventListener("click", openAboutWindow);

function openRentBookWindow() {
  ipcRenderer.send("openwindow:rentbook");
}

function openAboutWindow() {
  ipcRenderer.send("openwindow:about");
}
