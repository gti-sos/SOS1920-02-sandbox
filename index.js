const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const tourismAPI =require(path.join(__dirname,"tourismAPI"));

var port = process.env.PORT || 80;

var app = express();
app.use(bodyParser.json());

app.use("/",express.static("./public"));

tourismAPI(app);

app.listen(port, () => {
	console.log("server ready");
});

console.log("Starting server... ");