import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 5000;

let isPermited = false;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

function password(req, res, next) {
	const passwordChecker = req.body["password"];
	const userchecker = req.body["username"];

	if (passwordChecker === "burgerandpizza" && userchecker === "clarence") {
		isPermited = true;
	}
	next();
}

app.use(password);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

app.post("/identify", (req, res) => {
	if (isPermited) {
		res.sendFile(__dirname + "/public/content.html");
	} else {
		res.sendFile(__dirname + "/public/index.html");
	}
});

app.listen(port, () => {
	console.log("Server running in port 5000");
});

// Path: public/index.html
