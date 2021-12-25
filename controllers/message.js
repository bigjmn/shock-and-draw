function nextWord(io, socket){
  let team = socket.user.team
  team.refreshword()
  io.to(team.room).emit('takeWord', {word: team.word})
  io.to(team.room).emit('takeClear')
  let timeStamp = Date.now()
  io.to(team.room).emit('startBonus', {timeStamp:timeStamp})
  team.attackbonus = true;
}
module.exports = function(io, socket){
  socket.on('guess', (data) => {
    let team = socket.user.team
    if (data.guess.toLowerCase() != team.word.toLowerCase()){
      let censored = (team.hitwith.includes(4))
      io.to(team.room).emit('response', {
        guess: data.guess,
        censored: censored,
        name: socket.user.username,
        correct: false,
        passmessage: false
      })
      return
    }
    io.to(team.room).emit('response', {
      guess: data.guess,
      censored: false,
      name: socket.user.username,
      correct: true,
      passmessage: false
    })
    io.to(team.room).emit('correct')
    socket.user.correct++
    io.emit('takePoints', {color: team.name})

    if (team.attackbonus){
      //bounce empty event off guesser for handling ease
      socket.emit('attackBounce')
    }



  })
  socket.on('getNext', () => {
    nextWord(io, socket)
  })

  socket.on('passWord', () => {
    //eww
    io.to(socket.user.team.room).emit('response', {
      guess: socket.user.team.word,
      passmessage: true,
      name: socket.user.username,
      correct: false,
      censored: false
    })
    io.to(socket.user.team.opponent.drawer.id).emit('attackBounce')
    nextWord(io, socket)
  })

}
