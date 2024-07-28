const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
	return users.filter((user) => user.username === username)
};

const userAlreadyExists = (username) => {
	const exists = users.filter((user) => user.username === username)
	if (exists.length > 0) return true
	return false
}

const authenticatedUser = (username, password) => {
	return users.filter((user) => user.username === username && user.password === password);
};

//only registered users can login
regd_users.post("/login", (req, res) => {
	const {username, password} = req.body;

	if(!isValid(username)) return res.status(401).json({ message: "User not registered" })

	if(authenticatedUser) {
		const access_token = jwt.sign({ password }, "fingerprint_customer", { expiresIn: 3600 })
		req.session.authorization = { access_token, username };
		return res.status(200).json({ message: `User ${username} logged in successfully` })
	} else {
		return res.status(401).json({ message: "Invalid credentials" })
	}
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
	const { isbn } = req.params;
	const { review } = req.body;
	const { username } = req.session.authorization;

	try {
		if (!books[isbn]) {
			throw new Error( "Book not found" )
		} else {
			books[isbn].reviews[username] = review;
			return res.status(200).json({ message: `The user ${username} posted a review.` });
		}
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
	
	return res.status(500).json({ message: "Internal server error" });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
	const { isbn } = req.params;
	const { username } = req.session.authorization;

	try {
		if (!books[isbn]) {
			throw new Error( "Book not found" )
		} else {
			delete books[isbn].reviews[username];
			return res.status(200).json({ message: `The user ${username} deleted a review.` });
		}
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
	
	return res.status(500).json({ message: "Internal server error" });
});

module.exports.userAlreadyExists = userAlreadyExists;
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
