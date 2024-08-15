"use strict";
function writeBookInfo(book) {
    console.log(`Book title is ${book.title}, the book author is ${book.author} and the year of publication is ${book.yearPublication}`);
}
let book = {
    title: "I Have No Mouth, and I Must Scream",
    author: "Harlan Ellison",
    yearPublication: 1983
};
writeBookInfo(book);
