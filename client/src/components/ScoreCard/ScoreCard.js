import { useEffect } from 'react'
import socket from '../../context/socket.js'
import classes from './ScoreCard.module.css'

const ScoreCard = (props) => {

  useEffect(() => {
    socket.on('takePoints', (data) => {
      if (data.color === 'red') props.setRedPoints(x => x+1)
      if (data.color === 'blue') props.setBluePoints(x => x+1)
    })
    return () => { socket.off('takePoints') }
  })

  return (
    <div className={classes.pointsContainer}>
      <div className={classes.teampointsContainer}>
        <span className={classes.teamLabel} style={{color:'#ff3b2d'}}>RED</span>
        <span className={classes.teamScore} style={{color:'#ff3b2d'}}>{props.redPoints}</span>
      </div>
      <span className={classes.scoreDivider}>—</span>
      <div className={classes.teampointsContainer}>
        <span className={classes.teamLabel} style={{color:'#2df1ff'}}>BLUE</span>
        <span className={classes.teamScore} style={{color:'#2df1ff'}}>{props.bluePoints}</span>
      </div>
    </div>
  )
}

export default ScoreCard
