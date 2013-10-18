var express = require('express')
, app = express()
, server = require('http').createServer(app);

app.configure(function(){
    app.use(express.static(__dirname + '/'));
});

server.listen(8000);
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

