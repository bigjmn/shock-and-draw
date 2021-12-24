import socket from '../../context/socket.js'
const HostButton = ({playerUndecided}) => {

  const handleClick = () => {socket.emit('startgame')}


  return(
    <div className = 'hostbutton-container'>
      <button disabled={playerUndecided} onClick={handleClick}>Start the game</button>
    </div>
  )
}

export default HostButton
