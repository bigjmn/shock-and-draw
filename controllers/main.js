var lobbylist = require('../server')

function safeUsers(lobby) {
  return lobby.users.map(u => ({
    id: u.id,
    username: u.username,
    teamcolor: u.teamcolor
  }))
}

module.exports = function(io, socket){
  require('./pregame.js')(io, socket)
  require('./transitions.js')(io, socket)
  require('./canvas.js')(io, socket)
  require('./message.js')(io, socket)
  require('./clocks.js')(io, socket)
  require('./attacks.js')(io, socket)
  require('./roundrecap.js')(io, socket)

  socket.on('disconnect', () => {
    const lobby = socket.lobby

    // If lobby is now empty, purge it
    if (lobby.socketlist.length === 0) {
      const session = lobby.sessionStore.getBySocketId(socket.id)
      if (session) {
        clearTimeout(session.disconnectTimer)
        lobby.sessionStore.delete(session.sessionId)
      }
      lobbylist.splice(lobbylist.indexOf(lobby), 1)
      console.log('lobby purged')
      return
    }

    // Pre-game: immediate removal
    if (!lobby.midgame) {
      const session = lobby.sessionStore.getBySocketId(socket.id)
      if (session) lobby.sessionStore.delete(session.sessionId)
      if (socket.user.team) socket.user.team.removeUser(socket.user.id)
      io.emit('takeRoomData', {players: safeUsers(lobby)})
      io.to(lobby.host).emit('takeHost')
      return
    }

    // Mid-game: grace period — notify immediately, remove after 10s.
    // If the session's socketId no longer points to this socket, a reconnect
    // already replaced it — skip all processing to avoid a ghost disconnect.
    const session = lobby.sessionStore.getBySocketId(socket.id)
    if (!session) return

    io.emit('response', {
      systemMessage: true,
      text: `${socket.user.username} has disconnected`,
      disconnectNotice: true
    })

    session.drawing = socket.user.drawing
    session.teamIndex = socket.user.team ? socket.user.team.index : null
    session.disconnectTimer = setTimeout(() => {
      if (socket.user.drawing) io.emit('drawerQuit')
      if (socket.user.team) socket.user.team.removeUser(socket.user.id)
      const newHost = lobby.host
      if (newHost) io.to(newHost).emit('takeHost')
      lobby.sessionStore.delete(session.sessionId)
    }, 10000)
  })
}
