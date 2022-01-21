import {useEffect, useState} from 'react'
import socket from '../../context/socket.js'

import classes from './Recap.module.css'

const Recap = (props) => {

  const [redHistory, setRedHistory] = useState([])
  const [blueHistory, setBlueHistory] = useState([])

  const [shownRedPoints, setShownRedPoints] = useState(props.totalRedPoints)
  const [shownBluePoints, setShownBluePoints] = useState(props.totalBluePoints)




  useEffect(() => {
    socket.emit('getwordhistory')
  }, [])

  useEffect(() => {
    socket.on('takehistory', (data) => {
      if (!data.oldred && !data.oldblue){
        socket.emit('getPreview')
      }
      setRedHistory(oldHistory => data.oldred ? [...oldHistory, data.oldred] : oldHistory)
      setBlueHistory(oldHistory => data.oldblue ? [...oldHistory, data.oldblue] : oldHistory)
      if (data.oldred && data.oldred.success){
        setShownRedPoints(p => p+1)
      }
      if (data.oldblue && data.oldblue.success){
        setShownBluePoints(p => p+1)

      } 


    })

    return ()=> {
      socket.off('takehistory')
    }
  })


  return (
    <div className={classes.recapContainer}>
      <h1>End of Round {props.round}</h1>
    <div className={classes.pointsRecapContainer}>
      <div className={classes.totalpointsHolder} >
        <h1 style={{color:"#ff3b2d"}}>{shownRedPoints}</h1>
        {redHistory.map((oldword, i) => (
          <div key={i}>
            <h2 style={{color:oldword.success ? "green" : "gray"}}>{oldword.word}</h2>
          </div>
        ))}


      </div>
      <div className={classes.totalpointsHolder} >
        <h1 style={{color:"#2df1ff"}}>{shownBluePoints}</h1>

          {blueHistory.map((oldword, i) => (
            <div key={i}>
              <h2 style={{color:oldword.success ? "green" : "gray"}}>{oldword.word}</h2>
            </div>
          ))}
      </div>
    </div>
    </div>
  )
}



export default Recap
