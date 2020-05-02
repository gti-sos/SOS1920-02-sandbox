const express = require("express");
const bodyParser = require("body-parser");
const backMarta = require("./src/back/tourismAPI/");
const app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 80;

app.use("/",express.static("./public"));

////////////////////////////
////////API MARTA///////////
////////////////////////////

backMarta(app);






app.listen(port, () => {
	console.log("server ready");
});

console.log("Starting server... ");