var lobbylist = require('../server')
module.exports = function(io, socket){
  require('./pregame.js')(io, socket)
  require('./transitions.js')(io, socket)
  require('./canvas.js')(io, socket)
  require('./message.js')(io, socket)
  require('./clocks.js')(io, socket)
  require('./attacks.js')(io, socket)
  require('./roundrecap.js')(io, socket)


  socket.on('disconnect', () => {
    console.log(socket.lobby.users.length)
    if (socket.lobby.users.length == 0){
      lobbylist.splice(lobbylist.indexOf(socket.lobby),1)
      console.log('shut it down')
      console.log(lobbylist)
      return;
    }
    console.log('working 1')
    if (socket.lobby.midgame == false){
      io.emit('takeRoomData', {players:socket.lobby.users})
      console.log('working 2')
      io.to(socket.lobby.host).emit('takeHost')
    }

    console.log('working 3')
    if (socket.user.drawing){
      io.emit('drawerQuit')
    }
    console.log('working 4')
    if (socket.user.team){
      let team = socket.user.team

      team.removeUser(socket.user.id)
      console.log(team.users)

    }




  })


}
