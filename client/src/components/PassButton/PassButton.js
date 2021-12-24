import socket from '../../context/socket.js'
import classes from './PassButton.module.css'

const PassButton = ({isDrawing}) => {

  const handleClick = () => socket.emit('passWord')

  return (
    <div className={classes.passContainer}>
      <button disabled={!isDrawing} onClick={handleClick}>PASS</button>
    </div>
  )
}

export default PassButton
