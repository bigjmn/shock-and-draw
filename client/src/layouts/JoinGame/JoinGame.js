import {useState, useEffect} from 'react'
import classes from './JoinGame.module.css'
import socket from '../../context/socket.js'

const JoinGame = () => {

  return (
    <div className={classes.outerContainer}>
      <h1>Hang Tight!</h1>
      <p>The game you requested is in the middle of
       a round. </p>
     <p>Enter a username, and we'll put you on a team when the next round starts.</p>

    </div>
  )
}
export default JoinGame
