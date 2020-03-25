const express = require("express");
var bodyParser = require("body-parser");

var port = process.env.PORT || 80;

var app = express();
app.use(bodyParser.json());

const BASE_API_URL = "/api/v1";

/*--------------------------------------------------------------*/
/*----------------------------API MARTA-------------------------*/
/*--------------------------------------------------------------*/

var tourism = [{
	"province": "almeria",
	"year": 2015,
	"traveller": 11260,
	"overnightstay":37406,
	"averagestay": 3.3
},{
	"province": "cadiz",
	"year": 2015,
	"traveller": 28859,
	"overnightstay":77652,
	"averagestay": 2.7
},{
	"province": "cordoba",
	"year": 2015,
	"traveller": 22365,
	"overnightstay":76373,
	"averagestay": 3.4
},{
	"province": "granada",
	"year": 2015,
	"traveller": 23873,
	"overnightstay":67636,
	"averagestay": 2.8
},{
	"province": "huelva",
	"year": 2015,
	"traveller": 40651,
	"overnightstay":90601,
	"averagestay": 2.2
},{
	"province": "jaen",
	"year": 2015,
	"traveller": 23513,
	"overnightstay":63311,
	"averagestay": 2
},{
	"province": "malaga",
	"year": 2015,
	"traveller": 56208,
	"overnightstay":301760,
	"averagestay": 5.4
},{
	"province": "sevilla",
	"year": 2015,
	"traveller": 22454,
	"overnightstay":55880,
	"averagestay": 2.5
},];


//LOADINITIALDATA
app.get(BASE_API_URL + "/rural-tourism-stats/loadInitialData", (req, res) => {

	tourism =  [{"province": "almeria","year": 2015,"traveller": 11260,"overnightstay":37406,"averagestay": 3.3},
				{"province": "cadiz","year": 2015,"traveller": 28859,"overnightstay":77652,"averagestay": 2.7},
				{"province": "cordoba","year": 2015,"traveller": 22365,"overnightstay":76373,"averagestay": 3.4},
				{"province": "granada","year": 2015,"traveller": 23873,"overnightstay":67636,"averagestay": 2.8},
				{"province": "huelva","year": 2015,"traveller": 40651,"overnightstay":90601,"averagestay": 2.2},
				{"province": "jaen","year": 2015,"traveller": 23513,"overnightstay":63311,"averagestay": 2},
				{"province": "malaga","year": 2015,"traveller": 56208,"overnightstay":301760,"averagestay": 5.4},
				{"province": "sevilla","year": 2015,"traveller": 22454,"overnightstay":55880,"averagestay": 2.5},];
	
	res.sendStatus(200);
});

//GET /rural-tourism-stats

app.get(BASE_API_URL + "/rural-tourism-stats", (req,res)=>{
	res.send(JSON.stringify(tourism,null,2));
	//console.log("Data sent: " + JSON.stringify(tourism,null,2));
});


//GET /rural-tourism-stats/XXX

app.get(BASE_API_URL+"/rural-tourism-stats/:province", (req,res)=>{
	
	var province = req.params.province;
	
	var filteredTourism = tourism.filter((t) => {
		return (t.province == province);
	});
	
	
	if(filteredTourism.length >= 1){
		res.send(filteredTourism[0]);
	}else{
		res.sendStatus(404,"CONTACT NOT FOUND");
	}
});

// POST /rural-tourism-stats

app.post(BASE_API_URL+"/rural-tourism-stats",(req,res) =>{
	
	var newTourism = req.body;
	
	if((newTourism == "") || (newTourism.province == null)){
		res.sendStatus(400,"BAD REQUEST");
	} else {
		tourism.push(newTourism); 	
		res.sendStatus(201,"CREATED");
	}
});

//PUT /rural-tourism-stats/XXX

app.put(BASE_API_URL+"/rural-tourism-stats/:province", (req, res) =>{
	
	var province = req.params.province;
    var updateTourism = req.body;
	
	filteredTourism = tourism.filter((t) => {
		return (t.province == province);
	});
	console.log("Data sent: " + JSON.stringify(filteredTourism,null,2));
	if(filteredTourism.length == 0){
		res.sendStatus(404);
		return;
	}
	
	if(!updateTourism.province || !updateTourism.year ||!updateTourism.traveller || !updateTourism.overnightstay
	   || !updateTourism.averagestay || updateTourism.province != province){
                console.log("PUT recurso encontrado. Se intenta actualizar con campos no validos 400");
                res.sendStatus(400);
		return;
	}
	
	tourism = tourism.map((t) => {
		if(t.province == updateTourism.province){
			return updateTourism;
		}else{
			return t;
		}
		
	});
	res.sendStatus(200);
});

// DELETE /rural-tourism-stats

app.delete(BASE_API_URL + "/rural-tourism-stats", (req,res)=>{
	
	tourism = [];
	
	res.sendStatus(200);
});

// DELETE /rural-tourism-stats/XXX

app.delete(BASE_API_URL+"/rural-tourism-stats/:province", (req,res)=>{
	
	var province = req.params.province;
	
	var filteredTourism = tourism.filter((t) => {
		return (t.province != province);
	});
	
	
	if(filteredTourism.length < tourism.length){
		tourism = filteredTourism;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"TOURISM STAT NOT FOUND");
	}
	
	
});

//POST incorrecto
app.post(BASE_API_URL + "/rural-tourism-stats/:province", (req, res) => {
    res.sendStatus(405);
});

//PUT incorrecto
app.put(BASE_API_URL + "/rural-tourism-stats/", (req, res) => {
    res.sendStatus(405);
});



app.use("/",express.static("./public"));


app.listen(port, () => {
	console.log("server ready");
});

console.log("Starting server... ");