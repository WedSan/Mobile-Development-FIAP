interface Book{
    title: string;
    author: string;
    yearPublication: number;
}

function writeBookInfo(book: Book): void {
    console.log(`Book title is ${book.title}, the book author is ${book.author} and the year of publication is ${book.yearPublication}`)
}

let book: Book = {
    title: "I Have No Mouth, and I Must Scream",
    author: "Harlan Ellison",
    yearPublication: 1983
}

writeBookInfo(book)