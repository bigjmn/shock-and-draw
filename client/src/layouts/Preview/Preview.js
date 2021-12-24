import { useEffect } from 'react'
import classes from './Preview.module.css'
import socket from '../../context/socket.js'

const Preview = ({round, redDrawer, blueDrawer}) => {

  useEffect(() => {
    setTimeout(() => {socket.emit('getRoundData')}, 3000)
  }, [])


  return (
    <div className={classes.previewContainer}>
      <h1>Round {round}</h1>
      <h1 style={{textDecorationLine:'underline'}}>Drawers</h1>
      <div className={classes.matchupContainer}>
        <h1 style={{color:"#ff3b2d"}}>{redDrawer}</h1>
        <h2>vs.</h2>
        <h1 style={{color:"#2df1ff"}}>{blueDrawer}</h1>

      </div>
    </div>
  )
}
export default Preview
