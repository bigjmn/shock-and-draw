import {useState, useEffect} from 'react'
import socket from '../../context/socket.js'

import classes from './AttackCard.module.css'

const AttackCard = ({type, color, timestamp, maxTime, filterOut}) => {

  const [secs, setSecs] = useState(maxTime)

  useEffect(() => {
    let int = null
    int = setInterval(() => {
      let timeleft = maxTime-(Math.round((Date.now() - timestamp)/1000))


      if (timeleft <= 0){
        console.log(timeleft)
        filterOut(timestamp)
      }
      setSecs(timeleft)
    }, 1000)
    return () => {
      clearInterval(int)
    }

  }, [])

  return (
    <div style={{backgroundColor:color}} className={classes.cardContainer}>
      <h1>{type.title}</h1>
      <h2>{type.explainer}</h2>
      <div className={classes.timerspot}>
        {secs}
      </div>
      <h3>{type.flavor}</h3>

    </div>
  )
}

export default AttackCard
