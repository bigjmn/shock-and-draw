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

const GameRoom = (props) => {

  const [word, setWord] = useState(props.firstword)
  const [showRight, setShowRight] = useState(false)

  const toggleMute = () => props.setOnmute(m => !m)

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
    socket.on('thatscorrect', () => {
      showWord()
    })
    return () => {
      socket.off('takeWord')
      socket.off('thatscorrect')
    }
  })

  return(
    <div className={classes.gameContainer}>

      {/* ── HUD bar ── */}
      <div className={classes.hud}>
        <div className={classes.roundBadge}>
          <span className={classes.roundLabel}>ROUND</span>
          <span className={classes.roundNum}>{props.round}<span className={classes.roundTotal}>/{props.numRounds}</span></span>
        </div>

        <div className={classes.hudDivider}/>

        <div className={classes.roundclockContainer}>
          <RoundClock maxTime={props.roundTime}/>
        </div>

        <div className={classes.hudDivider}/>

        <div className={classes.wordboxContainer}>
          <WordBox word={word} isDrawing={props.isDrawing} showRight={showRight}/>
        </div>

        <div className={classes.hudDivider}/>

        <div className={classes.bonusclockContainer}>
          <BonusClock maxTime={props.bonusTime}/>
        </div>

        <div className={classes.passbuttonContainer}>
          <PassButton isDrawing={props.isDrawing}/>
        </div>

        <div className={classes.hudDivider}/>

        <div className={classes.scorecardContainer}>
          <ScoreCard
            setRedPoints={props.setRedPoints}
            setBluePoints={props.setBluePoints}
            redPoints={props.redPoints}
            bluePoints={props.bluePoints}/>
        </div>

        <button className={classes.muteButton} onClick={toggleMute} aria-label="Toggle mute">
          {props.onmute ? '🔇' : '🔊'}
        </button>
      </div>

      {/* ── Play area ── */}
      <div className={classes.playArea}>

        <div className={classes.chatPanel}>
          <MessageHolder />
          <MessageInput isDrawing={props.isDrawing}/>
        </div>

        <div className={classes.canvasPanel}>
          <CanvasRoom isDrawing={props.isDrawing} word={word}/>
        </div>

        <div className={classes.sidePanel}>
          <PlayerTags
            teamTags={props.teamTags}
            oppTags={props.oppTags}
            teamColor={props.teamColor}
            oppColor={props.oppColor}/>
          <AttackZone maxTime={props.attackTime} />
        </div>

      </div>
    </div>
  )
}
export default GameRoom
