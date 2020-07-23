const { Client } = require("pg");
const { dbconfig } = require("./js/dbconfig");

client = new Client(dbconfig);
client.connect();

client.query("SELECT bookid, title FROM rented_books", (err, res) => {
  const rentedBooksUl = document.querySelector("#rentedbooks-list");
  res.rows.forEach((row) => {
    const returnButton = document.createElement("button");
    const li = document.createElement("li");
    returnButton.innerHTML = "RETURN";
    returnButton.className = "btn waves-effect waves-light";
    returnButton.setAttribute("bookId", row.bookid);
    returnButton.addEventListener("click", returnBookClick);
    li.className = "collection-item booklist-item";
    const textNode = document.createTextNode(row.title);
    li.appendChild(textNode);
    li.appendChild(returnButton);
    rentedBooksUl.appendChild(li);
  });
});

function returnBookClick(evt) {
  const bookId = evt.target.getAttribute("bookId");
  console.log("Return book: ", bookId);
}
