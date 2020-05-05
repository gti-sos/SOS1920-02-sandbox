const express = require("express");
const bodyParser = require("body-parser");
const backMarta1 = require("./src/back/tourismAPI/v1");
const backMarta2 = require("./src/back/tourismAPI/v2");
const app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 80;

app.use("/",express.static("./public"));

////////////////////////////
////////API MARTA///////////
////////////////////////////

backMarta1(app);
backMarta2(app);






app.listen(port, () => {
	console.log("server ready");
});

console.log("Starting server... ");