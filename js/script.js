document.addEventListener("DOMContentLoaded", function () {
 
    const submitForm = document.getElementById("inputBook");
 
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const checkBox = document.getElementById('inputBookIsComplete').checked;
        if (checkBox == true) {
            inputBookIsComplete();
        } else {
            addBook();
        }        
    });

    if(isStorageExist()) {
        loadDataFromStorage();
    }
});

const searchSubmit = document.getElementById('searchSubmit');
searchSubmit.addEventListener('click', function(event) {
    event.preventDefault();
    searchBook();
})

document.addEventListener('ondatasaved', function() {
    console.log('Data Berhasil Disimpan');
});

document.addEventListener('ondataloaded', function() {
    refreshDataFromBooks();
});