const teamify = require('../utils/Team.js')

// Serialize only safe, non-circular fields from User objects
function safeUsers(lobby) {
  return lobby.users.map(u => ({
    id: u.id,
    username: u.username,
    teamcolor: u.teamcolor
  }))
}

module.exports = function(io, socket){
  socket.on('getRoomData', () => {
    // Don't respond with user list during midgame — User objects have circular
    // team refs (user.team → team.opponent → ...) that crash socket.io-parser.
    // Reconnecting players get their state from sendReconnectPayload instead.
    if (socket.lobby.midgame) return

    io.emit('takeRoomCode', {roomcode:socket.lobby.roomcode})
    io.emit('takeRoomData', {players: safeUsers(socket.lobby)})
    io.emit('takeTimerData', {roundtime:socket.lobby.roundTime, bonustime:socket.lobby.bonusTime, attacktime: socket.lobby.attackTime})
    io.emit('takeNumRounds', {numrounds: socket.lobby.numRounds})

    if (socket.id == socket.lobby.host){
      socket.emit('takeHost')
    }
  })

  socket.on('newUsername', (data) => {
    socket.leave('noname')
    socket.user.username = data.username
    const session = socket.lobby.sessionStore.get(socket.user.sessionId)
    if (session) session.username = data.username
    console.log(socket.user)
    io.emit('takeRoomData', {players: safeUsers(socket.lobby)})
  })

  socket.on('joinTeam', (data) => {
    socket.user.teamcolor = data.color
    const session = socket.lobby.sessionStore.get(socket.user.sessionId)
    if (session) session.teamcolor = data.color
    io.emit('takeRoomData', {players: safeUsers(socket.lobby)})
  })

  socket.on('giveTimerData', (data) => {
    console.log(data)
    socket.lobby.roundtime = data.roundtime
    socket.lobby.bonustime = data.bonustime
    socket.lobby.attacktime = data.attacktime
    io.emit('takeTimerData', {roundtime:socket.lobby.roundTime, bonustime:socket.lobby.bonusTime, attacktime: socket.lobby.attackTime})
  })

  socket.on('changeRoundTime', (data) => {
    socket.lobby.roundTime = data.time
    io.emit('takeTimerData', {roundtime:socket.lobby.roundTime, bonustime:socket.lobby.bonusTime, attacktime: socket.lobby.attackTime})
  })
  socket.on('changeBonusTime', (data) => {
    socket.lobby.bonusTime = data.time
    io.emit('takeTimerData', {roundtime:socket.lobby.roundTime, bonustime:socket.lobby.bonusTime, attacktime: socket.lobby.attackTime})

  })
  socket.on('changeAttackTime', (data) => {
    socket.lobby.attackTime = data.time
    io.emit('takeTimerData', {roundtime:socket.lobby.roundTime, bonustime:socket.lobby.bonusTime, attacktime: socket.lobby.attackTime})

  })
  socket.on('changeNumRounds', (data) => {
    socket.lobby.numRounds = data.numrounds
    io.emit('takeNumRounds', {numrounds:socket.lobby.numRounds})
  })

  socket.on('startgame', () => {
    console.log(socket.lobby.users.length)
    io.in('noname').disconnectSockets()
    console.log(socket.lobby.users.length)

    teamify(socket.lobby)
    socket.lobby.midgame = true;

    // Eagerly snapshot teamIndex into session so reconnects work even if the
    // disconnect event races with the new connection event.
    socket.lobby.socketlist.forEach(s => {
      const session = socket.lobby.sessionStore.get(s.user && s.user.sessionId)
      if (session && s.user.team) session.teamIndex = s.user.team.index
    })

    io.emit('toGameroom')
    console.log('starting')
  })
}
