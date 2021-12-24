import { useState, useEffect } from 'react'
import socket from '../../context/socket.js'
import classes from './ScoreCard.module.css'

const ScoreCard = (props) => {


  useEffect(() => {
    socket.on('takePoints', (data) => {
      if (data.color == 'red'){
        props.setRedPoints(x => x+1)
      }
      if (data.color == 'blue'){
        props.setBluePoints(x => x+1)
      }
    })
    return () => {
      socket.off('takePoints')
    }
  })

  return (
    <div className={classes.pointsContainer}>
      <div className={classes.teampointsContainer}
        style={{backgroundColor:"#ff3b2d"}}><h1>{props.redPoints}</h1></div>
      <div className={classes.teampointsContainer}
        style={{backgroundColor:"#2df1ff"}}><h1>{props.bluePoints}</h1></div>
    </div>
  )

}

export default ScoreCard
