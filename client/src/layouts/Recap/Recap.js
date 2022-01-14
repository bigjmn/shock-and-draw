import {useEffect, useState} from 'react'
import socket from '../../context/socket.js'
import {useAudio} from '../../components/AudioPlayer/AudioPlayer.js'
import sound from './settingpiece.mp3'
import classes from './Recap.module.css'

const Recap = (props) => {

  const [flipping, setFlipping] = useState(false)
  const [redHistory, setRedHistory] = useState([])
  const [blueHistory, setBlueHistory] = useState([])

  const [shownRedPoints, setShownRedPoints] = useState(props.totalRedPoints)
  const [shownBluePoints, setShownBluePoints] = useState(props.totalBluePoints)

  const handleRightRed = () => {
    setShownRedPoints(p => p+1)
  }
  const handleRightBlue = () => {
    setShownBluePoints(p => p+1)
  }


  useEffect(() => {
    socket.emit('getwordhistory')
  }, [])

  useEffect(() => {
    socket.on('takehistory', (data) => {
      setRedHistory(data.redhistory)
      setBlueHistory(data.bluehistory)
      setFlipping(true)
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
        {flipping && redHistory.map((oldword, i) => (
          <div key={i}>
            <OldWord handleAdd={handleRightRed} word={oldword.word} success={oldword.success} delay={500*(i+1)}/>
          </div>
        ))}


      </div>
      <div className={classes.totalpointsHolder} >
        <h1 style={{color:"#2df1ff"}}>{shownBluePoints}</h1>

          {flipping && blueHistory.map((oldword, i) => (
            <div key={i}>
              <OldWord handleAdd={handleRightBlue} word={oldword.word} success={oldword.success} delay={500*(i+1)}/>
            </div>
          ))}
      </div>
    </div>
    </div>
  )
}

const OldWord = ({word, success, delay, handleAdd}) => {


  const [flip, setFlip] = useState(false)
  const [playing, toggle] = useAudio(sound)
  useEffect(() => {
    setTimeout(() => {
      setFlip(true)
      toggle()


      if (success){
        handleAdd()
      }
    }, delay)
  }, [])

  return (
    <div className={classes.wordcard}>
  <div className={flip ? classes.flipped : ""}>
    <div className={classes.blankside}><h2 style={{color: success ? "green" : "gray"}}>{word}</h2></div>
  </div>
</div>

  )
}

export default Recap
