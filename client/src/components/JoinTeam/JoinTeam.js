import socket from '../../context/socket.js'
import classes from './JoinTeam.module.css'
const JoinTeam = ({color, username}) => {

  const teamname = color == 'red' ? 'RED TEAM' : 'BLUE TEAM'


  const handleClick = () => {
    if (username == ''){
      return
    }
    socket.emit('joinTeam', {color:color})

  }

  return(
    <div>
      <button className={classes.buttonStyle} onClick={handleClick}>Join {teamname}</button>
    </div>
  )
}

export default JoinTeam
