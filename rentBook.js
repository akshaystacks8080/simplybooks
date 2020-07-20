const { Client } = require("pg");
const { dbconfig } = require("./dbconfig");

const btnSearchBook = document.querySelector("#btn-searchbook");

btnSearchBook.addEventListener("click", searchBook);

async function searchDatabase(query) {
  const result = [];
  const client = new Client(dbconfig);
  client.connect();
  await client.query(
    `SELECT title FROM books WHERE LOWER(title) LIKE LOWER('%${query}%')`,
    (err, res) => {
      res.rows.forEach((row) => {
        //console.log(row);
        result.push(row);
      });
    }
  );
  return result;
}

async function searchBook(evt) {
  evt.preventDefault();
  console.log("search btn clicked");
  const searchBar = document.querySelector("#input-search");
  const searchQuery = searchBar.value;
  console.log(searchQuery);
  const result = await searchDatabase(searchQuery);
  console.log(result);
}
