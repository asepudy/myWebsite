const STORAGE_KEY = 'BOOK_APPS';

let books = [];

function isStorageExist() {
    if(typeof(Storage) === undefined) {
        alert('Browser Kamu Tidak Mendukung Local Storage');
        return false;
    } return true;
};

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event('ondatasaved'))
};

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if(data !== null) {
        books = data
    }
    document.dispatchEvent(new Event('ondataloaded'))
};

function updateDataToStorage() {
    if(isStorageExist()) {
        saveData();
    }
};

function composeBookObject(title, author, year, isCompleted) {
    return {
        id: +new Date(),
        title: title,
        author: author,
        year: year,
        isCompleted: isCompleted
    }
};

function findBook(bookId) {
    for (book of books) {
        if(book.id === bookId) {
            return book;
        }
    }
    return null;
};

function findBookIndex(bookId) {
    let index = 0;
    for(book of books) {
        if(book.id === bookId) {
            return index;
        }
        index++;
    }
    return -1;
};

function refreshDataFromBooks() {
    const bookUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const bookCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    for(book of books) {
        const newBook = makeBook(book.title, book.author, book.year, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;

        if(book.isCompleted) {
            bookCompleted.append(newBook);
        } else {
            bookUncompleted.append(newBook);
        }
    }
};

