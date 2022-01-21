module.exports = function (io, socket){
  socket.on('getwordhistory', () => {
    if (socket.id != socket.lobby.host){
      return
    }
    let redhistory = socket.lobby.teams[0].wordhistory
    let bluehistory = socket.lobby.teams[1].wordhistory
    for (let i=0; i<Math.max(redhistory.length,bluehistory.length);i++){
      setTimeout(() => {
        io.emit('rendersound')
        io.emit('takehistory', {oldred: (redhistory[i] ? redhistory[i] : null),
        oldblue: (bluehistory[i] ? bluehistory[i] : null)})
      }, 1000*i)
    }



  })
}
