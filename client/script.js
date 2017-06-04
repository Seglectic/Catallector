document.title = "Videogame Collection Catalog System"
// console.log("Connecting to socket..")


var sock = io.connect('http://Spaghett.net:9001'); //Connect to the ledServe socket

sock.on('bonjour',function(data){
	document.getElementById('title').innerHTML += data.ver //Append acquired version to title
	console.log(data.motd, data.ver)
})


document.getElementById('searchButton').onclick=function(){
	var search = document.getElementById('nameSearch').value
	sock.emit('gSearch',search)
}