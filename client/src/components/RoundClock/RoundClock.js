import {useState, useEffect} from 'react'
import socket from '../../context/socket.js'

import Timer from '../Timer/Timer.js'
import classes from './RoundClock.module.css'
const RoundClock = ({maxTime}) => {

  const [startTime, setStartTime] = useState(0)

  const [secs, setSecs] = useState(0)


  const secSetter = (time) => {
    setSecs(time)
    if (time <= 0){
      setStartTime(0)
      socket.emit('roundOver')
    }
  }

  useEffect(() => {
    socket.on('startRound', (data) => {
      setStartTime(data.timeStamp)
    })
    return () => {
      socket.off('startRound')
    }
  })

  return(
    <div>
      <h1>{secs}</h1>
      <Timer secSetter={secSetter} maxTime={maxTime} startTime={startTime}/>

    </div>
  )
}

export default RoundClock
