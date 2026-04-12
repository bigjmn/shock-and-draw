module.exports = function(io, socket){
  socket.on('sendPack', (data) => {
    if (socket.user.team) socket.user.team.strokeHistory.push({ type: 'line', ...data.payload })
    io.to(socket.user.team.room).emit('takePacket', {payload: data.payload})
  })
  socket.on('sendDot', (data) => {
    if (socket.user.team) socket.user.team.strokeHistory.push({ type: 'dot', ...data.payload })
    io.to(socket.user.team.room).emit('takeDot', {payload: data.payload})
  })
  socket.on('clearCanvas', () => {
    if (socket.user.team) socket.user.team.strokeHistory = []
    io.to(socket.user.team.room).emit('takeClear')
  })
}
