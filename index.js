const express = require("express");
var bodyParser = require("body-parser");

var port = process.env.PORT || 80;

var app = express();
app.use(bodyParser.json());

//--------------------------------------RURAL-TOURISM-STATS-------------------------------------------------------------//

var tourism = [{
	"province": "almeria",
	"year": 2015,
	"traveller": 11260,
	"overnight-stay":37406,
	"average-stay": 3.3
},{
	"province": "cadiz",
	"year": 2015,
	"traveller": 28859,
	"overnight-stay":77652,
	"average-stay": 2.7
}];

//GET /tourism

app.get("/tourism", (req,res)=>{
	res.send(tourism);
	
});

//POST /tourim

app.post("/tourism", (req,res)=>{
	
	var newTourism = req.body;
	
	tourism.push(newTourism);
	
	res.sendStatus(201);
});

//DELETE /tourism

app.delete("/tourism", (req,res)=>{
	
	tourism = [];
	
	res.sendStatus(200);
});

//GET /tourism/almeria

app.get("/tourism/:province", (req,res)=>{
	
	var province = req.params.province;
	
	var filteredTourism = tourism.filter((t)=>{
		return t.province == province
	})
	
	if(filteredTourism.length >=1){
		res.send(filteredTourism[0]);
	}else{
		res.sendStatus(404);
	}
	
	
	res.sendStatus(200);
})

//----------------------------------------------------------------------------------------------------------------------------//



app.use("/",express.static("./public"));


app.listen(port, () => {
	console.log("server ready");
});

console.log("Starting server... ");