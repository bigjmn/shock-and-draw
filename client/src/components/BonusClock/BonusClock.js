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

  const pct = secs > 0 ? (secs / maxTime) * 100 : 0

  return(
    <div className={classes.bonusWrapper}>
      <span className={classes.bonusLabel}>BONUS</span>
      <div className={classes.bonusBarTrack}>
        {secs > 0
          ? <div className={classes.bonusBarFill} style={{width: pct + '%'}} />
          : <div className={classes.bonusBarEmpty} />
        }
      </div>
      <span className={`${classes.bonusSecs} ${secs <= 0 ? classes.bonusSecsEmpty : ''}`}>
        {secs > 0 ? secs : '—'}
      </span>
      <Timer secSetter={secSetter} maxTime={maxTime} startTime={startTime}/>
    </div>
  )
}

export default BonusClock
