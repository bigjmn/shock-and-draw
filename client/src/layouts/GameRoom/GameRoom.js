import {useState, useEffect} from 'react'
import socket from '../../context/socket.js'
import classes from './GameRoom.module.css'
import MessageHolder from '../../components/MessageHolder/MessageHolder.js'
import MessageInput from '../../components/MessageInput/MessageInput.js'
import CanvasRoom from '../canvasroom/CanvasRoom.js'
import WordBox from '../../components/WordBox/WordBox.js'
import RoundClock from '../../components/RoundClock/RoundClock.js'
import BonusClock from '../../components/BonusClock/BonusClock.js'
import AttackZone from '../../components/AttackZone/AttackZone.js'
import PassButton from '../../components/PassButton/PassButton.js'
import ScoreCard from '../../components/ScoreCard/ScoreCard.js'
import PlayerTags from '../../components/PlayerTags/PlayerTags.js'
import Player from '../../components/AudioPlayer/AudioPlayer.js'
const GameRoom = (props) => {

  const [word, setWord] = useState(props.firstword)
  const [showRight, setShowRight] = useState(false)

  const showWord = () => {
    setShowRight(true)
    setTimeout(() => {socket.emit('getNext')}, 1000)
  }

  useEffect(() => {
    socket.emit('readyforClock')
  }, [])

  useEffect(() => {
    socket.on('takeWord', (data) => {
      setShowRight(false)
      setWord(data.word)
    })
    socket.on('correct', () => {
      showWord()
    })
    return () => {
      socket.off('takeWord')
      socket.off('correct')
    }
  })


  return(
    <div className={classes.gameContainer}>
      <div className={classes.topBar}>
        <div className={classes.roundContainer}>
          <h2>Round {props.round} / {props.numRounds}</h2>
        </div>
        <div className={classes.roundclockContainer}>
          <RoundClock maxTime={props.roundTime}/>
        </div>
        <div className={classes.bonusclockContainer}>
          <BonusClock maxTime={props.bonusTime}/>
        </div>
        <div className={classes.wordboxContainer}>
          <WordBox word={word} isDrawing={props.isDrawing} showRight={showRight}/>
        </div>
        <div className={classes.passbuttonContainer}>
          <PassButton isDrawing={props.isDrawing}/>
        </div>
        <div className={classes.scorecardContainer}>
          <ScoreCard
            setRedPoints={props.setRedPoints}
            setBluePoints={props.setBluePoints}
            redPoints={props.redPoints}
            bluePoints={props.bluePoints}/>
        </div>

      </div>
      <div className={classes.middleBar}>
        <div className={classes.playerTagContainer}>
          <PlayerTags teamTags={props.teamTags} oppTags={props.oppTags} teamColor={props.teamColor} oppColor={props.oppColor}/>
        </div>
        <div className={classes.messageContainer}>
          <MessageHolder />
          <MessageInput isDrawing={props.isDrawing}/>
        </div>
        <div className={classes.canvasContainer}>
          <CanvasRoom isDrawing={props.isDrawing} />
        </div>
        <div className={classes.attackZoneContainer}>
          <AttackZone maxTime={props.attackTime} />
        </div>
      </div>
      <Player />

    </div>
  )
}
export default GameRoom
