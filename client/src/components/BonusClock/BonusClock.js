import {useState, useEffect} from 'react'
import socket from '../../context/socket.js'

import Timer from '../Timer/Timer.js'
import classes from './BonusClock.module.css'
const BonusClock = ({maxTime}) => {

  const [startTime, setStartTime] = useState(0)
  const [secs, setSecs] = useState(0)


  const secSetter = (time) => {
    setSecs(time)
    if (time <= 0){
      setStartTime(0)
      socket.emit('bonusOver')
    }
  }

  useEffect(() => {
    socket.on('startBonus', (data) => {
      setStartTime(data.timeStamp)
    })
    return () => {
      socket.off('startBonus')
    }
  })

  return(
    <div className={classes.bonusStyle}>
      {secs > 0 ? <div style={{height:"60px", backgroundColor:"gold", width:secs*120/maxTime, float:'left'}}></div>
    : <div className={classes.noBonus}></div>}
      <Timer secSetter={secSetter} maxTime={maxTime} startTime={startTime}/>

    </div>
  )
}

export default BonusClock
