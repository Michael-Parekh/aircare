var http = require('http');
var express = require('express');
var app     = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var rp = require('request-promise');

var key = "dec24c80c40a497bae6c99ee810522cb";

var options = {
    url: 'https://api.breezometer.com/baqi/?lat=40.7324296&lon=-73.9977264&key=' + key,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

io.on('connection', function (socket) {
//NFJWJS522SMB1UTT
//https://www.alphavantage.co/
    socket.on("get stocks", function(){
       getStockData()
    });
    
    function getStockData() {
        rp(options)
            .then(function (data) {
                console.log(data)
                socket.emit("recieve stocks", data)
            })
            .catch(function (err) {
                // API call failed...
            });
    }
});




app.use(express.static(__dirname + '/public'));

server.listen(process.env.PORT || 3000, function () {
  console.log('Server listening at port %d 3000');
});
