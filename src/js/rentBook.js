const electron = require("electron");
const { Client } = require("pg");
const { dbconfig } = require("./js/dbconfig");
const { ipcRenderer } = electron;

const btnSearchBook = document.querySelector("#btn-searchbook");

btnSearchBook.addEventListener("click", searchBook);

function displayResults(query) {
  const searchResultsUl = document.querySelector("#search-results");
  searchResultsUl.innerHTML = "";
  const client = new Client(dbconfig);
  client.connect();
  client.query(
    `SELECT bookid, title FROM books WHERE LOWER(title) LIKE LOWER('%${query}%')
     AND bookid NOT IN(SELECT bookid FROM rented_books)`,
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
        const rentButton = document.createElement("button");
        rentButton.innerHTML = "Rent";
        rentButton.className = "btn waves-effect waves-light";
        rentButton.addEventListener("click", rentButtonClick);
        li.className = "collection-item booklist-item";
        const textNode = document.createTextNode(row.title);
        li.setAttribute("bookId", row.bookid);
        rentButton.setAttribute("bookId", row.bookid);
        li.appendChild(textNode);
        li.appendChild(rentButton);
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

function insertBook(bookId, bookTitle) {
  const client2 = new Client(dbconfig);
  client2.connect();
  client2.query(
    `INSERT INTO rented_books VALUES(${bookId}, '${bookTitle}')`,
    (err, res) => {
      M.toast({
        html: `Rented Book ${bookId} ${bookTitle}`,
        displayLength: 3000,
      });
    }
  );
}

async function isBookRented(bookId) {
  let isRented = false;
  const client = new Client(dbconfig);
  client.connect();
  const { rows } = await client.query(
    `SELECT bookid FROM rented_books WHERE bookid=${bookId}`
  );
  if (rows.length) {
    isRented = true;
  }
  //console.log(rows, isRented);
  return isRented;
}

async function rentButtonClick(evt) {
  const bookId = evt.target.getAttribute("bookId");
  console.log("Rent button clicked", bookId);
  const client = new Client(dbconfig);
  client.connect();
  client.query(
    `SELECT title FROM books WHERE bookid=${bookId}`,
    async (err, res) => {
      bookTitle = res.rows[0].title;
      const isRented = await isBookRented(bookId);
      // console.log("rentButtonClick:", isRented);
      if (!isRented) {
        console.log("Book not rented - renting it.");
        insertBook(bookId, bookTitle);
      }
    }
  );
  //M.toast({ html: `Rented Book ${bookId}`, displayLength: 3000 });
}
