const books = [];
const members = [];
const borrowedBooks = [];

function addBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    
    if (title && author) {
        books.push({ title, author });
        document.getElementById('bookTitle').value = '';
        document.getElementById('bookAuthor').value = '';
        updateAvailableBooks();
    }
}

function registerMember() {
    const name = document.getElementById('memberName').value;
    
    if (name) {
        members.push(name);
        document.getElementById('memberName').value = '';
        updateMembersList();
    }
}

function borrowBook() {
    const memberName = document.getElementById('borrowMemberName').value;
    const bookTitle = document.getElementById('borrowBookTitle').value;
    
    const bookIndex = books.findIndex(book => book.title === bookTitle);
    const isMember = members.includes(memberName);

    if (bookIndex >= 0 && isMember) {
        const [borrowedBook] = books.splice(bookIndex, 1);
        borrowedBooks.push({ ...borrowedBook, memberName });
        document.getElementById('borrowMemberName').value = '';
        document.getElementById('borrowBookTitle').value = '';
        updateAvailableBooks();
        updateBorrowedBooks();
    }
}

function returnBook() {
    const memberName = document.getElementById('returnMemberName').value;
    const bookTitle = document.getElementById('returnBookTitle').value;

    const borrowedIndex = borrowedBooks.findIndex(
        book => book.title === bookTitle && book.memberName === memberName
    );

    if (borrowedIndex >= 0) {
        const [returnedBook] = borrowedBooks.splice(borrowedIndex, 1);
        books.push({ title: returnedBook.title, author: returnedBook.author });
        document.getElementById('returnMemberName').value = '';
        document.getElementById('returnBookTitle').value = '';
        updateAvailableBooks();
        updateBorrowedBooks();
    }
}

function updateAvailableBooks() {
    const availableBooksList = document.getElementById('availableBooksList');
    availableBooksList.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `"${book.title}" by ${book.author}`;
        availableBooksList.appendChild(li);
    });
}

function updateBorrowedBooks() {
    const borrowedBooksList = document.getElementById('borrowedBooksList');
    borrowedBooksList.innerHTML = '';
    borrowedBooks.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `"${book.title}" by ${book.author} (Borrowed by ${book.memberName})`;
        borrowedBooksList.appendChild(li);
    });
}

function updateMembersList() {
    const membersList = document.getElementById('membersList');
    membersList.innerHTML = '';
    members.forEach(member => {
        const li = document.createElement('li');
        li.textContent = member;
        membersList.appendChild(li);
    });
}
