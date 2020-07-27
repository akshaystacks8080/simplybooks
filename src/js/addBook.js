const submitButton = document.querySelector("#btn-addbook");

submitButton.addEventListener("click", submitForm);

function submitForm(evt) {
  evt.preventDefault();

  const checkEmpty = (val) => val !== "";
  const messageBox = document.getElementById("message-box");
  const title = document.getElementById("title").value;
  const authors = document.getElementById("authors").value;
  const averageRating = document.getElementById("average_rating").value;
  const isbn = document.getElementById("isbn").value;
  const isbn13 = document.getElementById("isbn_13").value;
  const langCode = document.getElementById("language_code").value;
  const numPages = document.getElementById("num_pages").value;
  const ratingCount = document.getElementById("rating_count").value;
  const textReviews = document.getElementById("text_reviews_count").value;
  const publicationDate = document.getElementById("publication_date").value;
  const publisher = document.getElementById("publisher").value;

  if (
    checkEmpty(title) &&
    checkEmpty(authors) &&
    checkEmpty(averageRating) &&
    checkEmpty(isbn) &&
    checkEmpty(isbn13) &&
    checkEmpty(langCode) &&
    checkEmpty(numPages) &&
    checkEmpty(ratingCount) &&
    checkEmpty(textReviews) &&
    checkEmpty(publicationDate) &&
    checkEmpty(publisher)
  ) {
    messageBox.innerHTML = "Form Complete! Added to database.";
  } else {
    messageBox.innerHTML = "Form Incomplete!";
  }
}
