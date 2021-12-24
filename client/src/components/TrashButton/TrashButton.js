import socket from '../../context/socket.js'
const TrashButton = () => {

  const handleClick = () => {
    socket.emit('clearCanvas')
  }

  return(
    <div>
      <button style={{backgroundColor:"white", width:"40px", height:"40px"}} onClick={handleClick}>🗑</button>
    </div>
  )
}

export default TrashButton
