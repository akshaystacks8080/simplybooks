const electron = require("electron");
const { ipcRenderer } = electron;

const btnRentBook = document.querySelector("#btn-rentbook");

btnRentBook.addEventListener("click", openRentBookWindow);

function openRentBookWindow() {
  ipcRenderer.send("openwindow:rentbook");
}
