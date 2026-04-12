module.exports = function(io, socket){
  socket.on('readyforClock', () => {
    // If clock already started (e.g. reconnecting socket), sync only to this socket
    if (socket.lobby.roundStartTime !== null) {
      socket.emit('startRound', {timeStamp: socket.lobby.roundStartTime})
      socket.emit('startBonus', {timeStamp: socket.lobby.roundStartTime})
      return
    }
    socket.lobby.readyusers++
    if (socket.lobby.readyusers < socket.lobby.users.length){
      return;
    }
    socket.lobby.readyusers = 0
    let timeStamp = Date.now()
    socket.lobby.roundStartTime = timeStamp
    socket.lobby.gamestage = 'playing'

    // Snapshot drawing state into sessions so reconnects get the right drawer flag
    socket.lobby.socketlist.forEach(s => {
      const session = socket.lobby.sessionStore.get(s.user && s.user.sessionId)
      if (session) session.drawing = s.user.drawing
    })

    io.emit('startRound', {timeStamp:timeStamp})
    io.emit('startBonus', {timeStamp:timeStamp})
  })

  socket.on('bonusOver', () => {
    socket.user.team.attackbonus = false
  })
}
