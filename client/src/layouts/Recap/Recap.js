import {useEffect, useState} from 'react'
import socket from '../../context/socket.js'

import classes from './Recap.module.css'

const Recap = (props) => {

  useEffect(() => {
    setTimeout(() => {socket.emit('getPreview')}, 5000)
  }, [])


  return (
    <div className={classes.recapContainer}>
      <h1>End of Round {props.round}</h1>
    <div className={classes.pointsRecapContainer}>
      <div className={classes.totalpointsHolder} >
        <h1 style={{color:"#ff3b2d"}}>{props.redDrawer}</h1>

        <h1 style={{color:"#ff3b2d"}}>{props.totalRedPoints}</h1>
        <h1 style={{color:"#ff3b2d"}}>+ {props.redPoints}</h1>
        <h1 style={{backgroundColor:"#ff3b2d"}}>{props.redPoints + props.totalRedPoints}</h1>
      </div>
      <div className={classes.totalpointsHolder} >
        <h1 style={{color:"#2df1ff"}}>{props.blueDrawer}</h1>

        <h1 style={{color:"#2df1ff"}}>{props.totalBluePoints}</h1>
        <h1 style={{color:"#2df1ff"}}>+ {props.bluePoints}</h1>
        <h1 style={{backgroundColor:"#2df1ff"}}>{props.bluePoints + props.totalBluePoints}</h1>
      </div>
    </div>
    </div>
  )
}

export default Recap
