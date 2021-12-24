module.exports = function(io, socket){
  socket.on('readyforClock', () => {
    socket.lobby.readyusers++
    if (socket.lobby.readyusers < socket.lobby.users.length){
      return;
    }
    socket.lobby.readyusers = 0
    let timeStamp = Date.now()
    io.emit('startRound', {timeStamp:timeStamp})
    io.emit('startBonus', {timeStamp:timeStamp})
  })

  socket.on('bonusOver', () => {
    socket.user.team.attackbonus = false
  })
}
