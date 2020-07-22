const { Client } = require("pg");
const { dbconfig } = require("./js/dbconfig");

client = new Client(dbconfig);
client.connect();

client.query("SELECT title FROM rented_books", (err, res) => {
  const rentedBooksUl = document.querySelector("#rentedbooks-list");
  res.rows.forEach((row) => {
    const li = document.createElement("li");
    li.className = "collection-item booklist-item";
    const textNode = document.createTextNode(row.title);
    li.appendChild(textNode);
    rentedBooksUl.appendChild(li);
  });
});
