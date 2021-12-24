import socket from '../../context/socket.js'
import {useEffect, useState} from 'react'

import classes from './EndGame.module.css'

const EndGame = ({totalRedPoints, totalBluePoints}) => {

  useEffect(() => {
    setTimeout(() => {socket.emit('backtoWaitRoom')}, 8000)
  }, [])

  return (
    <div className={classes.finalScoreContainer}>
      {totalRedPoints > totalBluePoints &&
      <h1 style={{color:"#ff3b2d"}}>RED TEAM WINS!</h1>
      }
      {totalBluePoints > totalRedPoints &&
      <h1 style={{color:"#2df1ff"}}>BLUE TEAM WINS!</h1>
      }
      {totalBluePoints == totalRedPoints &&
      <div>
        <h1>It's TIE!</h1>
        <p>A tie? Seriously?</p>
      </div>
      }
      <div className={classes.scoresBar}>
        <div className={classes.scoreContainer} style={{backgroundColor:"#ff3b2d"}}>
          <h2>{totalRedPoints}</h2>
        </div>
        <div className={classes.scoreContainer} style={{backgroundColor:"#2df1ff"}}>
          <h2>{totalBluePoints}</h2>
        </div>
      </div>


    </div>
  )
}

export default EndGame
