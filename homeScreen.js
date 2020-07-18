const electron = require("electron");
const { ipcRenderer } = electron;

const btnRentBook = document.querySelector("#btn-rentbook");
const btnAbout = document.querySelector("#btn-about");
const btnViewBooks = document.querySelector("#btn-viewbooks");

btnRentBook.addEventListener("click", openRentBookWindow);
btnAbout.addEventListener("click", openAboutWindow);
btnViewBooks.addEventListener("click", openViewBooksWindow);

function openRentBookWindow() {
  ipcRenderer.send("openwindow:rentbook");
}

function openAboutWindow() {
  ipcRenderer.send("openwindow:about");
}

function openViewBooksWindow() {
  ipcRenderer.send("openwindow:viewbooks");
}
