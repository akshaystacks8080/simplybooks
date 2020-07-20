const { Client } = require("pg");
const { dbconfig } = require("./js/dbconfig");

const btnSearchBook = document.querySelector("#btn-searchbook");

btnSearchBook.addEventListener("click", searchBook);

function displayResults(query) {
  const searchResultsUl = document.querySelector("#search-results");
  searchResultsUl.innerHTML = "";
  const client = new Client(dbconfig);
  client.connect();
  client.query(
    `SELECT title FROM books WHERE LOWER(title) LIKE LOWER('%${query}%')`,
    (err, res) => {
      if (res.rows.length == 0) {
        const li = document.createElement("li");
        li.className = "collection-item";
        const textNode = document.createTextNode("No Results Found.");
        li.appendChild(textNode);
        searchResultsUl.appendChild(li);
      }
      res.rows.forEach((row) => {
        const li = document.createElement("li");
        li.className = "collection-item";
        const textNode = document.createTextNode(row.title);
        li.appendChild(textNode);
        searchResultsUl.appendChild(li);
      });
    }
  );
}

function searchBook(evt) {
  evt.preventDefault();
  console.log("search btn clicked");
  const searchBar = document.querySelector("#input-search");
  const searchQuery = searchBar.value;
  displayResults(searchQuery);
}
