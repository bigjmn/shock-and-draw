module.exports = function(io, socket){
  socket.on('getPreview', () => {
    if (socket.id != socket.lobby.host){
      return
    }
    socket.lobby.round++
    if (socket.lobby.round > socket.lobby.numRounds){
      socket.lobby.round = 0
      socket.lobby.purgeteams()

      io.emit('endGame')
      return
    }


    socket.lobby.teams.forEach((team) => {
      team.prepRound(socket.lobby.round)


    })
    var previewPack = {
      round: socket.lobby.round,
      reddrawer: socket.lobby.teams[0].drawer.username,
      bluedrawer: socket.lobby.teams[1].drawer.username
    }
    console.log('sending preview')
    io.emit('previewLaunch', {payload:previewPack})

  })

  socket.on('getRoundData', () => {
    var gamePack = {
      isDrawing: socket.user.drawing,
      color: socket.user.team.color,
      oppcolor: socket.user.team.opponent.color,
      teamtags: socket.user.team.teamtags,
      opptags: socket.user.team.opponent.teamtags,

      firstword: socket.user.team.word



    }

    socket.emit('takeRoundData', {payload:gamePack})
  })
  socket.on('roundOver', () => {
    if (socket.id != socket.lobby.host){
      return
    }
    var recapPack = {

    }
    io.emit('takeRecap')
  })
  socket.on('backtoWaitRoom', () => {
    socket.leave('redroom')
    socket.leave('blueroom')
    socket.user.team = null

    console.log(socket.user)
    socket.emit('toWaitRoom')

  })
}
