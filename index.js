import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 5000; // always run see the port if it's runnin or not

let isPermited = false;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

function password(req, res, next) {
	// This is the middleware
	const passwordChecker = req.body["password"];
	const userchecker = req.body["username"];

	if (passwordChecker === "burgerandpizza" && userchecker === "clarence") {
		isPermited = true;
	}
	next();
}

app.use(password);

app.get("/", (req, res) => {
	// This is the home page
	res.sendFile(__dirname + "/public/index.html");
});

app.post("/identify", (req, res) => {
	if (isPermited) {
		// If the user is permited, send the content page
		res.sendFile(__dirname + "/public/content.html");
	} else {
		res.sendFile(__dirname + "/public/index.html");
	}
});

app.listen(port, () => {
	console.log("Server running in port 5000");
});

// Path: public/index.html
