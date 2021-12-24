module.exports = function(io, socket){
  socket.on('sendPack', (data) => {
    io.to(socket.user.team.room).emit('takePacket', {payload:data.payload})
  })
  socket.on('sendDot', (data) => {
    io.to(socket.user.team.room).emit('takeDot', {payload:data.payload})
  })
  socket.on('clearCanvas', () => {
    io.to(socket.user.team.room).emit('takeClear')
  })
}
