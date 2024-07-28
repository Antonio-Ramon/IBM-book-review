const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;

const app = express();

app.use(express.json());

app.use(
	"/customer",
	session({
		secret: "fingerprint_customer",
		resave: true,
		saveUninitialized: true,
	})
);

app.use("/customer/auth/*", function auth(req, res, next) {
	if(req.session && req.session.authorization) {
		const token = req.session.authorization['access_token'];
		
		if (token) {
			jwt.verify(token, "fingerprint_customer", (err, user) => {
				if (err) {
					return res.status(403).json({ message: "Invalid token" });
				}
				req.user = user;
				next();
			});
		} else {
			return res.status(401).json({ message: "No token provided" });
		}
	} else {
		return res.status(401).json({ message: "User not logged in" });
	}

});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
