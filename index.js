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
	"overnightstay":37406,
	"averagestay": 3.3
},{
	"province": "cadiz",
	"year": 2015,
	"traveller": 28859,
	"overnightstay":77652,
	"averagestay": 2.7
}];

var copyTourism = tourism;

//LOADINITIALDATA
app.get("/tourism/loadInitialData", (req, res) => {

	if(tourism == copyTourism){
		res.sendStatus(409);
	}else{
		tourism = copyTourism
		res.sendStatus(201);
	}
});

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


// PUT /tourism/XXX

app.put("/tourism/:province", (req, res) =>{
	
	var province = req.params.province;
    var updateTourism = req.body;
	
	filteredTourism = tourism.filter((t) => {
		return (t.province != province);
	});
	
	if(filteredTourism.length == 0){
		res.sendStatus(404);
	}
	
	if(province != updateTourism.province){
		console.log("La provincia no puede ser modificada")
		res.sendStatus(409);
		return;
	}
	
	if(!updateTourism.province || !updateTourism.year ||!updateTourism.traveller || !updateTourism.overnightstay
	   || !updateTourism.averagestay ||updateTourism.province != province || Object.keys(updateTourism).length != 5 ){
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

/*
app.put(BASE_API_PATH+"/contacts/:name",(req,res)=>{
    var name = req.params.name;
    var contact = req.body;
    
    console.log(Date() + " - PUT /contacts/"+name);
    
    if(name != contact.name){
        res.sendStatus(409);
        console.warn(Date()+" - Hacking attempt!");
        return;
    }
    
    contacts = contacts.map((c)=>{
        if(c.name == contact.name)
            return contact;
        else
            return c;
    });
    
    res.sendStatus(200);
});
*/

//----------------------------------------------------------------------------------------------------------------------------//



app.use("/",express.static("./public"));


app.listen(port, () => {
	console.log("server ready");
});

console.log("Starting server... ");