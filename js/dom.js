const UNCOMPLETED_LIST_BOOK_ID = 'uncompleteBookshelfList';
const COMPLETED_LIST_BOOK_ID = 'completeBookshelfList';
const BOOK_ITEMID = 'itemId';

function makeBook(title, author, year, isCompleted) {
    const textTitle = document.createElement('h2');
    textTitle.innerText = title;

    const textAuthor = document.createElement('h4');
    textAuthor.innerText = author;

    const textYear = document.createElement('p');
    textYear.innerText = year;    

    const article = document.createElement('article');
    article.classList.add('book_item');
    article.append(textTitle, textAuthor, textYear);

    if(isCompleted) {
        article.append(
            createUndoButton(), createRedButton()
        );
    } else {
        article.append(
            createGreenButton(), createRedButton()
        );
    }

    return article;

};

function createButton(buttonTypeClass, buttontext, eventListener) {
    const button = document.createElement('button');
    button.classList.add(buttonTypeClass);
    button.innerText = buttontext;
    button.addEventListener('click', function(event) {
        eventListener(event);
    });
    return button;
};

function createGreenButton() {
    return createButton('green', 'Sudah dibaca', function(event) {
        addBookToCompleted(event.target.parentElement);
    });
};

function createRedButton() {
    return createButton('red', 'Hapus Buku', function(event) {
        removeBookFromCompleted(event.target.parentElement);
    });
};

function createUndoButton() {
    return createButton('undo', 'Belum Selesai Dibaca', function(event) {
        undoBookFromCompleted(event.target.parentElement);
    })
};

function searchBook() {
    const searchBookTitle = document.getElementById('searchBookTitle');
    const searchValue = searchBookTitle.value.toUpperCase();
    const bookTitle = document.querySelectorAll('.book_item');

    for(let i = 0; i < bookTitle.length; i++) {
        let h2 = bookTitle[i].getElementsByTagName('h2')[0];
        let textTitle = h2.textContent || h2.innerText;
        if(textTitle.toUpperCase().indexOf(searchValue) > -1) {
            bookTitle[i].style.display = "";
        } else {
            bookTitle[i].style.display = "none";
        }
    }
};

function addBook() {
    const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID); 
    
    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById('inputBookYear').value;

    const book = makeBook(bookTitle, bookAuthor, bookYear, false);
    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, false);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    uncompletedBookList.append(book);
    updateDataToStorage();
};

function inputBookIsComplete() {
    const bookCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById('inputBookYear').value;

    const book = makeBook(bookTitle, bookAuthor, bookYear, true);
    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, true);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    bookCompleted.append(book);
    updateDataToStorage();
};

function addBookToCompleted(bookElement) {
    const bookCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const bookTitle = bookElement.querySelector('.book_item > h2').innerText;
    const bookAuthor = bookElement.querySelector('.book_item > h4').innerText;
    const bookYear = bookElement.querySelector('.book_item > p').innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;
    
    bookCompleted.append(newBook);
    bookElement.remove();
    updateDataToStorage();
};

function removeBookFromCompleted(bookElement) {
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    bookElement.remove();
    updateDataToStorage();
};

function undoBookFromCompleted(bookElement) {
    const bookUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

    const bookTitle = bookElement.querySelector('.book_item > h2').innerText;
    const bookAuthor = bookElement.querySelector('.book_item > h4').innerText;
    const bookYear = bookElement.querySelector('.book_item > p').innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    bookUncompleted.append(newBook);
    bookElement.remove();
    updateDataToStorage();
};



