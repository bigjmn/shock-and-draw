import socket from '../../context/socket.js'

import classes from './JoinTeam.module.css'
import { motion } from 'framer-motion'
const JoinTeam = ({color, username}) => {

  const teamname = color == 'red' ? 'RED TEAM' : 'BLUE TEAM'


  const handleClick = () => {
    if (username == ''){
      return
    }
    socket.emit('joinTeam', {color:color})

  }

  return(
    <motion.div>
      <motion.button whileHover={{scale: 1.1}} className={classes.buttonStyle} onClick={handleClick}>Join {teamname}</motion.button>
    </motion.div>
  )
}

export default JoinTeam
