const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {

    const doesExist = (username)=>{
        let userswithsamename = users.filter((user)=>{
          return user.username === username
        });
        if(userswithsamename.length > 0){
          return true;
        } else {
          return false;
        }
    }

  const username = req.body.username;
  const password = req.body.password;

    if( username && password) {
      if (!doesExist(username)) {
          users.push({"username":username, "password":password});
          return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});  
      }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    
    const getBooks = new Promise((resolve, reject) => {
       resolve (res.send(JSON.stringify({books},null,4)));

    });
        
    getBooks.then(() => console.log("Promise for Task 10 resolved"));
    
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {

    const isbn = req.params.isbn;
    const getBooksFrom_isbn = new Promise((resolve, reject) => {

        resolve (res.send(books[isbn]));
    });
    getBooksFrom_isbn.then(() => console.log("Promise for Task 11 resolved"));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  
  let bookDetails = Object.values(books)
  console.log(bookDetails);
  
  let filtered_Books = bookDetails.filter((book) => book.author === author);

  const getBooksFromAuthor = new Promise((resolve, reject) => {

    resolve( res.send(filtered_Books));
  });
  getBooksFromAuthor.then(() => console.log("Promise for Task 12 resolved"));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
  
    let bookDetails_title = Object.values(books)
    console.log(bookDetails_title);
    
    let filtered_Titles = bookDetails_title.filter((book) => book.title === title);
    
    const getBooksFromTitle = new Promise((resolve, reject) => {

        resolve( res.send(filtered_Titles));
    });
    getBooksFromTitle.then(() => console.log("Promise for Task 13 resolved"));

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = parseInt(req.params.isbn) -1;

  let bookDetails_isbn = Object.values(books)
  review = (bookDetails_isbn[isbn]);
  console.log(review);
  res.send(review.reviews);
});

module.exports.general = public_users;
