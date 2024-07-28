const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let userAlreadyExists = require("./auth_users.js").userAlreadyExists;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register a new costumer
public_users.post("/register", function (req, res) {
  const {username, password } = req.body;

  if (username && password) {
      if (!userAlreadyExists(username)) {
          users.push({ username: username, password: password });
          
          return res.status(200).json({message:`User ${username} Registered Successfully`});
      }
      else {
          return res.status(400).json({message:`User ${username} Already registered`});
      }
  }
  else {
      return res.status(404).json({message: "Must provide username and password"});
  }
});

// Promise to get the book list available
function getAllBooks() {
  return new Promise((resolve, reject) => {
    resolve(books);
  })
}

// Get the book list available in the shop
public_users.get('/', async (req, res) => {
  try {
    const books = await getAllBooks();
    res.send(JSON.stringify(books));
  } catch (e) {
    console.error(e.message);
    res.status(500).send({error: 'Internal server error'});
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
  return new Promise( async (resolve, reject) => {
    const ISBN = req.params.isbn;
  
    try {
      const books = await getAllBooks();
  
      if(books[ISBN] !== undefined && books[ISBN] !== null) {
        const find_book = books[ISBN]
        resolve(res.status(200).send(JSON.stringify(find_book)));
      } else {
        throw new Error("Book not found");
      }
    } catch (error) {
      resolve(res.status(404).json({ 'error': error.message }));
    }
  })
 });
  
// Get book details based on author
public_users.get('/author/:author', (req, res) => {
  return new Promise( async (resolve, reject) => {
    const AUTHOR = req.params.author.toLowerCase();
    const finded_books = [];
  
    try {
      const books = await getAllBooks();
  
      for (const [key, value] of Object.entries(books)) {
        if (value.author.toLowerCase() === AUTHOR) {
          finded_books.push(value)
        }
      }
  
      if(finded_books.length > 0) {
        resolve(res.status(200).send(JSON.stringify(finded_books)))
      } else {
        throw new Error("Author not found");
      }
      
    } catch (error) {
      resolve(res.status(404).send(JSON.stringify({'error': error.message})));
    }
  })
});

// Get all books based on title
public_users.get('/title/:title', (req, res) => {
  return new Promise( async (resolve, reject) => {
    const TITLE = req.params.title.toLowerCase();
  
    try {
      const books = await getAllBooks();
      let finded_book = '';
  
      for (const [key, value] of Object.entries(books)) {
        if (value.title.toLowerCase() === TITLE) {
          finded_book = value;
        }
      }
      if(finded_book !== undefined) {
        resolve(res.status(200).send(JSON.stringify(finded_book)));
      } else {
        throw new Error("Book not found")
      }
  
    } catch (error) {
      resolve(res.status(404).send(JSON.stringify({ 'error': error.message })));
    }
  })
});

//  Get book review
public_users.get('/review/:isbn', async (req, res) => {
  const ISBN = req.params.isbn;
  
  try {
    const books = await getAllBooks();

    if(books[ISBN] !== undefined && books[ISBN] !== null) {
      const finded_book = books[ISBN]
  
      const review = {
        // title: finded_book.title,
        review: finded_book.reviews
      }

      res.status(200).send(JSON.stringify(review));
    } else {
      throw new Error("Book not found")
    }

  } catch (error) {
    res.status(404).send(JSON.stringify({ 'error': error.message }));
  }

});

module.exports.general = public_users;
