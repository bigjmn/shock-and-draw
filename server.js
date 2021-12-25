const express = require('express');
const path = require('path');
const app = express();
var http = require('http');
var shortid = require('shortid')

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var _ = require('lodash')
const socketio = require('socket.io')
var userify = require('./utils/User.js')

const server = require("http").createServer(app);
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'client','login','index.html'))
})
app.use(express.static(path.join(__dirname, 'client', 'build')))
app.use(express.static(path.join(__dirname, 'client', 'login')))


var io = socketio(server)

var lobbylist = []

app.post('/create', function(req, res){
  var roomcode = require('./utils/makecode.js')(4)
  while (_.find(lobbylist, {roomcode:roomcode})){
    var roomcode = require('./utils/makecode.js')(4)

  }
  var roomid = shortid.generate()
  var urlpath = '/room/'+roomid

  var nsp = io.of(urlpath)
  nsp.on('connection', (socket) => {
    console.log('connected')
    userify(socket)
    socket.join('noname')
    socket.lobby = _.find(lobbylist, {nsp:socket.nsp})
    socket.lobby.hostid = socket.id

    require('./controllers/main')(nsp, socket)

    console.log(socket.user)


  })
  var newlobby = require('./utils/Lobby.js')(roomid, urlpath, nsp, roomcode)
  lobbylist.push(newlobby)
  res.redirect(newlobby.urlpath)


})
app.post('/join', function(req, res){
  console.log(req.body.roomcode)
  var foundlobby = _.find(lobbylist, {roomcode:req.body.roomcode.toUpperCase()})
  if (foundlobby){
    let targetURL = foundlobby.urlpath
    res.redirect(targetURL)
  }
  else {
    res.redirect('/')
  }
})

app.get('/room/:roomid', function (req, res) {
  var foundlobby = _.find(lobbylist, {roomid : req.params.roomid})
  if (foundlobby){

    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))

    return
  }
  res.redirect('/')

});





server.listen(port, () => {
  console.log(`application is running at: http://localhost:${port}`);
});

module.exports = lobbylist
