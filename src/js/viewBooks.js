const { Client } = require("pg");
const { dbconfig } = require("./js/dbconfig");

const client = new Client(dbconfig);

client.connect();

client.query("SELECT title FROM books", (err, res) => {
  const rows = res.rows;
  console.log(rows);
  rows.forEach((row) => {
    const title = row.title;
    const ulBooks = document.querySelector("#books-list");
    const li = document.createElement("li");
    li.className = "collection-item";
    const liText = document.createTextNode(title);
    li.appendChild(liText);
    ulBooks.appendChild(li);
  });
});
