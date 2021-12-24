const teamify = require('../utils/Team.js')

module.exports = function(io, socket){
  socket.on('getRoomData', () => {


    io.emit('takeRoomData', {players:socket.lobby.users})
    io.emit('takeTimerData', {roundtime:socket.lobby.roundTime, bonustime:socket.lobby.bonusTime, attacktime: socket.lobby.attackTime})
    io.emit('takeNumRounds', {numrounds: socket.lobby.numRounds})


    if (socket.id == socket.lobby.host){
      socket.emit('takeHost')
    }
  })

  socket.on('newUsername', (data) => {
    socket.user.username = data.username
    console.log(socket.user)
    io.emit('takeRoomData', {players:socket.lobby.users})
  })

  socket.on('joinTeam', (data) => {
    socket.user.teamcolor = data.color
    io.emit('takeRoomData', {players:socket.lobby.users})
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

    teamify(socket.lobby)
    socket.lobby.midgame = true;


    io.emit('toGameroom')
    console.log('starting')
  })
}
