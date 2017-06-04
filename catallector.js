/*

			Catallector
	Videogame Collection Catalog System

*/

var Version = 0.1;


var gamedb = require('thegamesdb');
var catalog = {};

/*
		Express setup
*/
var express = require('express');
var app = express();														 							//Make express instance
app.use(express.static(__dirname + '/client'));															//Static file routing
app.port = 80;		 																					//Define a port
var server = app.listen(app.port,function(){console.log("Server started on port",app.port,"\n\n");});	//Start server instance from express.


/*
	Setup socket.io for comms
*/
var http = require('http').Server(express);
var io = require('socket.io')(http);



/*
	General socket.io connection handling
*/

io.on('connection',function(sock){
	sock.addr = sock.request.connection.remoteAddress.split(':')[3] 
	console.log('Client connected from '+sock.addr+' | ID: '+sock.id);

	//Emit a hello world message
	sock.emit('bonjour',{motd:'❤ Welcome to Catallector ❤',ver:Version});


	//Handle game name searches and return results
	sock.on('gSearch',function(data){
		console.log(gamedb.getGamesList({ name: 'super mario', platform: 'Super Nintendo (SNES)'}))
	})



	sock.on('disconnect',function(){
		console.log(sock.addr+' disconnected.'+ '| ID: '+sock.id+"\n");
	});

});




//Listen for io socket connections
http.listen(9001);