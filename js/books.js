const API_KEY = "AIzaSyDktWrRaRuU-9fiMUvjb4qwbDvrf9Xdp_s";

const bookImgById = document.getElementById("bookImage");
const bookNameById = document.getElementById("bookName");
const authorNameById = document.getElementById("authorName");
const publishedDateById = document.getElementById("publishedDate");
const descriptionById = document.getElementById("description");
const isbnById = document.getElementById("isbn");
const genreInput = document.getElementById("genreInput");

async function ValidateIsbnAndSearchBook() {
    const isbn = isbnById.value;

    if (isbn === "") {
        alert("Kindly Add Book ISBN");
    }
    else {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${API_KEY}`);

            if(!response.ok){
                throw new Error('Book Not Found or Request Failed');
            }

            const data = await response.json();

            if (!data.items || data.items.length === 0) {
                throw new Error('No book matches this ISBN');
            }

            const book = data.items[0].volumeInfo;
            bookImgById.src = book.imageLinks ? book.imageLinks.thumbnail : '../images/library.webp';
            bookNameById.value = book.title || '';
            authorNameById.value = book.authors ? book.authors.join(', ') : 'Author Unknown';
            publishedDateById.value = book.publishedDate ? book.publishedDate : 'Not Available';
            descriptionById.value = book.description ? book.description : 'Not Available';
            genreInput.value = book.categories ? book.categories.join(', ') : 'Not Available';
        }
        catch (error)
        {
            alert(error.message);
        }
    }
}