var httpProxy = require('http-proxy');
var express = require('express');
var app = express();
var mysql = require("mysql");


//connexion base de donnée
var bdd = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'chatRoom'
});

bdd.connect();



//subscribe
app.get('/subscribe', function (req, res) {
    var login = req.query.login;
    var req = 'INSERT INTO users (nom) values("'+login+'")';
   bdd.query(req,function(err,rows){
       if (!err)
         res.send({"response":login});
       else res.send({"response":"login exist"});
      });
});

//addSalon
app.post('/addSalon', function (req, res) {
    var nomSalon = req.query.nomSalon;
    var login = req.query.login;
   

    var req = 'INSERT INTO salon (nomSalon) values("'+nomSalon+'")';
    var req1 = 'INSERT INTO login (nomLogin, nomSalon) values("'+login+'","'+nomSalon+'")';

  	bdd.query(req,function(err,rows){
	   if (!err){
	   		bdd.query(req1,function(err1,rows1){
	   			if(!err1)
			   console.log("req1");
			  });
	     res.json({"response":nomSalon});
	   }
	   else  res.json({"response":"salon exist"});    
	  });
});

//get other rooms
app.get('/getAnotherRooms', function (req, res) {
	var liste = [];
    var login = req.query.login;
    var req = 'SELECT nomSalon FROM login WHERE nomLogin!="'+login+'"';
    bdd.query(req,function(err,rows){
    	if (!err) {
    		rows.forEach(function (row) {
    			liste.push(row.nomSalon);
    		})
    		res.json(liste); 
    	}
    });
    //res.json(getAnotherRooms(login)); 
    
});

//add Message
app.post('/sendMessage', function (req, res) {
    var salon = req.query.salon;
    var message = req.query.message;
    var login = req.query.login;
    message = login+" --> "+message;
    addMessageSalon(salon, message);
    var req = 'INSERT INTO message (contenuMessage, nomSalon) values("'+message+'", "'+salon+'")';
   	bdd.query(req,function(err,rows){
       if (!err)
       	console.log(req);
        res.json({"response":message});
      });
    
});


//get messages rooms
app.get('/getMessagesSalon', function (req, res) {
    var login = req.query.login;
    var salon = req.query.salon;
    var liste = [];
    var req = 'SELECT contenuMessage FROM message WHERE nomSalon="'+salon+'"';
    bdd.query(req,function(err,rows){
    	if (!err) {

    		rows.forEach(function (row) {
    			liste.push(row.contenuMessage);
    		})
    		res.json(liste);
    	}
    });
     
});

//get rooms
app.get('/getRooms', function (req, res) {
    var liste = [];
    var req = 'SELECT nomSalon FROM salon';
    bdd.query(req,function(err,rows){
    	if (!err) {

    		rows.forEach(function (row) {
    			liste.push(row.nomSalon);
    		})
    		   res.json(liste);
    	}
    });

});

//unSubscribe
app.post('/unSubscribe', function (req, res) {
    var login = req.query.login;
    var req = 'DELETE FROM login WHERE nomLogin="'+login+'"';
    var req1 = 'DELETE FROM users WHERE nom="'+login+'"';
  	bdd.query(req,function(err,rows){
       if (!err){
       		res.json({"response":"deconnexion"});
       		bdd.query(req1,function(err1,rows1){
		    });
       }
       
    });
});

app.listen(8092);
