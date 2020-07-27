const electron = require("electron");
const { ipcRenderer } = electron;

const btnRentBook = document.querySelector("#btn-rentbook");
const btnAbout = document.querySelector("#btn-about");
const btnViewBooks = document.querySelector("#btn-viewbooks");
const btnViewRentedBooks = document.querySelector("#btn-viewrentedbooks");
const btnAddBook = document.querySelector("#btn-addbook");

btnRentBook.addEventListener("click", openRentBookWindow);
btnAbout.addEventListener("click", openAboutWindow);
btnViewBooks.addEventListener("click", openViewBooksWindow);
btnViewRentedBooks.addEventListener("click", openViewRentedBooksWindow);
btnAddBook.addEventListener("click", openAddBookWindow);

function openAddBookWindow() {
  ipcRenderer.send("openwindow:addbook");
}

function openRentBookWindow() {
  ipcRenderer.send("openwindow:rentbook");
}

function openAboutWindow() {
  ipcRenderer.send("openwindow:about");
}

function openViewBooksWindow() {
  ipcRenderer.send("openwindow:viewbooks");
}

function openViewRentedBooksWindow() {
  ipcRenderer.send("openwindow:viewrentedbooks");
}
