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

// ── Attack names (indexed 0-6, matches attacklist.js order) ──
const attacknames = ['fathands','hidemouse','nocolor','reverse','classified','peepingtom','canfade']

function sendReconnectPayload(socket, lobby) {
  const stage = lobby.gamestage

  if (stage === 'endgame') {
    socket.emit('endGame')
    return
  }

  if (stage === 'preview') {
    socket.emit('previewLaunch', { payload: {
      round: lobby.round,
      reddrawer: lobby.teams[0].drawer ? lobby.teams[0].drawer.username : '',
      bluedrawer: lobby.teams[1].drawer ? lobby.teams[1].drawer.username : '',
      startTime: lobby.previewStartTime,
      funfact: ''
    }})
    return
  }

  // 'playing' or 'recap' — send full game state
  const team = socket.user.team
  if (!team) return
  const oppTeam = team.opponent

  socket.emit('takeRoundData', { payload: {
    isDrawing: socket.user.drawing,
    color: team.color,
    oppcolor: oppTeam.color,
    teamtags: team.teamtags,
    opptags: oppTeam.teamtags,
    firstword: team.word,
    round: lobby.round,
    numRounds: lobby.numRounds,
    roundTime: lobby.roundTime,
    bonusTime: lobby.bonusTime,
    attackTime: lobby.attackTime,
    isReconnect: true
  }})

  if (lobby.roundStartTime) {
    socket.emit('startRound', { timeStamp: lobby.roundStartTime })
    socket.emit('startBonus', { timeStamp: lobby.roundStartTime })
  }

  socket.emit('takeScoreSync', {
    redPoints: lobby.teams[0].totalPoints,
    bluePoints: lobby.teams[1].totalPoints
  })

  socket.emit('takeStrokeReplay', { strokes: team.strokeHistory })

  Object.entries(lobby.attackmemo).forEach(([ts, val]) => {
    if (val === 'cleared') return
    const [teamIndex, attackIndex] = val
    const hitTeam = lobby.teams[teamIndex]
    socket.emit('takeAttack', { timestamp: Number(ts), color: hitTeam.color, type: attackIndex })
    // Re-apply attack effect events only to the affected team member
    if (hitTeam.index === team.index) {
      socket.emit(attacknames[attackIndex])
    }
  })
}

function handleReconnect(socket, lobby, session, sessionId, nsp) {
  // Cancel the grace-period timer if it was running
  if (session.disconnectTimer) {
    clearTimeout(session.disconnectTimer)
    session.disconnectTimer = null
  }

  userify(socket)
  socket.user.sessionId = sessionId
  socket.user.username = session.username
  socket.user.teamcolor = session.teamcolor
  lobby.sessionStore.updateSocketId(sessionId, socket.id)

  if (session.teamIndex !== null && lobby.teams) {
    const team = lobby.teams[session.teamIndex]
    // If user is still in team.users (within grace period), update their id
    const existing = team.users.find(u => u.username === session.username)
    if (existing) {
      existing.id = socket.id
      socket.user = existing
      socket.user.sessionId = sessionId
    } else {
      // Timer already fired and removed them — re-add
      socket.user.team = team
      socket.user.drawing = session.drawing
      team.users.push(socket.user)
      if (session.drawing) team.drawer = socket.user
    }
    socket.user.team = team
    socket.join(team.room)
  }

  nsp.emit('response', {
    systemMessage: true,
    text: `${socket.user.username} has reconnected`,
    reconnectNotice: true
  })

  require('./controllers/main')(nsp, socket)
  sendReconnectPayload(socket, lobby)
}

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
    const lobby = _.find(lobbylist, {nsp: socket.nsp})
    socket.lobby = lobby

    const incomingSessionId = socket.handshake.auth && socket.handshake.auth.sessionId
    const existingSession = incomingSessionId ? lobby.sessionStore.get(incomingSessionId) : null
    const isReconnect = existingSession && lobby.midgame

    if (isReconnect) {
      handleReconnect(socket, lobby, existingSession, incomingSessionId, nsp)
      return
    }

    // Normal new connection flow
    userify(socket)
    socket.user.sessionId = incomingSessionId

    if (incomingSessionId) {
      // If this sessionId already has a live socket (two tabs), issue a new one
      const isActiveDuplicate = existingSession &&
        existingSession.socketId &&
        lobby.socketlist.find(s => s.id === existingSession.socketId)

      if (isActiveDuplicate) {
        const newId = require('crypto').randomUUID()
        socket.emit('sessionAssigned', { sessionId: newId })
        socket.user.sessionId = newId
        lobby.sessionStore.set(newId, {
          sessionId: newId, socketId: socket.id,
          username: '', teamcolor: 'none',
          teamIndex: null, drawing: false, disconnectTimer: null
        })
      } else {
        lobby.sessionStore.set(incomingSessionId, {
          sessionId: incomingSessionId, socketId: socket.id,
          username: '', teamcolor: 'none',
          teamIndex: null, drawing: false, disconnectTimer: null
        })
      }
    }

    // Reject mid-game joiners who have no session
    if (lobby.midgame) {
      socket.emit('lobbyMidgame')
      socket.disconnect()
      return
    }

    socket.join('noname')
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
