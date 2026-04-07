import socket from '../../context/socket.js'
import classes from './TrashButton.module.css'

const TrashButton = () => {
  const handleClick = () => { socket.emit('clearCanvas') }
  return (
    <button className={classes.trashBtn} onClick={handleClick} aria-label="Clear canvas" title="Clear canvas">
      🗑
    </button>
  )
}

export default TrashButton
