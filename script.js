const myLibrary = [];
const libFromStorage = JSON.parse(localStorage.getItem("library"));
console.log(libFromStorage);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function render() {
    let library = document.querySelector(".library");
    library.innerHTML = "";
    for(let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        let card = document.createElement("div");

        card.innerHTML = `<div class="innerCard">
                            <h3><strong>${book.title}</strong></h3>
                            <div>By <strong>${book.author}</strong></div>
                            <div>Number of Pages: <strong>${book.pages}</strong></div>
                            <div>Status: <strong>${book.read ? "Has Been Read" : "Not Read Yet"}</strong></div>
                          </div>
                          <div class="buttons">
                              <button onclick="removeBook(${i})" class="remove">Remove</button>
                              <button onclick="toggleRead(${i})" class="toggle">Toggle Read</button>
                          </div>`
        card.className = "card";
        library.appendChild(card);
    }
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    render();
}

function toggleRead(index) {
    myLibrary[index].read = !(myLibrary[index].read);
    render();
}

function addBookToLibrary() {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").checked;

    const book = new Book(title, author, pages, read);
    console.log(book);
    myLibrary.push(book);
    render();
    localStorage.setItem("library", JSON.stringify(myLibrary));
}


if (libFromStorage) {
    for (let i = 0; i < libFromStorage.length; i++) {
        myLibrary.push(libFromStorage[i]);
    }
    render();
}

function clearInput() {
    document.querySelectorAll("input").forEach((element) => {
        if (element.getAttribute("type") != "checkbox") {
            element.value = "";
        }
        else {
            element.checked = false;
        }
    })
}

const modal = document.getElementById("modal");
const addButton = document.querySelector("#add-btn");
addButton.addEventListener("click", () => {
    modal.showModal();
})

const cancel = document.querySelector(".cancel");
cancel.addEventListener("click", () => {
    modal.close();
    clearInput();
})

const form = document.querySelector("#bookForm");
form.addEventListener("submit", function(event){
    event.preventDefault();
    addBookToLibrary();
    clearInput();
})

const submit = document.querySelector("#confirm");
submit.addEventListener("click", () => {
    modal.close();
})

