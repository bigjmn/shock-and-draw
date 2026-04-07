import socket from '../../context/socket.js'
import classes from './HostButton.module.css'

const HostButton = ({playerUndecided}) => {

  const handleClick = () => { socket.emit('startgame') }

  return(
    <div className={classes.container}>
      <button className={classes.startButton} disabled={playerUndecided} onClick={handleClick}>
        Start the Game
      </button>
    </div>
  )
}

export default HostButton
