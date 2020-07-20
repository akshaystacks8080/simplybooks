const { Client } = require("pg");
const { dbconfig } = require("./dbconfig");

const btnSearchBook = document.querySelector("#btn-searchbook");

btnSearchBook.addEventListener("click", searchBook);

function searchDatabse() {
  const result = [];
  const client = new Client(dbconfig);
  client.connect();
  return result;
}

function searchBook(evt) {
  evt.preventDefault();
  console.log("searcg btn clicked");
  const searchBar = document.querySelector("#input-search");
  const searchQuery = searchBar.value;
  console.log(searchQuery);
  const result = searchDatabse(searchQuery);
}
