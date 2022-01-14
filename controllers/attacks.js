const attacknames = ['fathands', 'hidemouse', 'nocolor', 'reverse', 'classified', 'peepingtom', 'canfade']
module.exports = function(io, socket){
  socket.on('giveAttack', () => {
    let oppTeam = socket.user.team.opponent
    let attackIndex = oppTeam.newattack
    //memoize w timestamp
    let timeStamp = Date.now()
    socket.lobby.attackmemo[timeStamp] = [oppTeam.index, attackIndex]
    //send everyone data for attack card
    io.emit('takeAttack', {timestamp:timeStamp, color:oppTeam.color, type: attackIndex})
    //send hit team the attack
    io.to(oppTeam.room).emit(attacknames[attackIndex])

    console.log(`${oppTeam.name} team was hit with ${attacknames[attackIndex]}`)
  })
  socket.on('clearAttack', (data) => {
    if (socket.lobby.attackmemo[data.timestamp] == 'cleared'){
      return;
    }
    let attackstat = socket.lobby.attackmemo[data.timestamp]
    let team = socket.lobby.teams[attackstat[0]]
    let attackIndex = attackstat[1]
    team.hitwith = team.hitwith.filter(x => (x != attackIndex))
    console.log(team.hitwith)
    io.to(team.room).emit(attacknames[attackIndex]+'clear')
    socket.lobby.attackmemo[data.timestamp] = 'cleared'

  })
}
