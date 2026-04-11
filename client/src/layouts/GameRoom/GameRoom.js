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
  const [activeTab, setActiveTab] = useState('canvas')

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
        <div className={classes.hudRow1}>
          <div className={classes.roundBadge}>
            <span className={classes.roundLabel}>ROUND</span>
            <span className={classes.roundNum}>{props.round}<span className={classes.roundTotal}>/{props.numRounds}</span></span>
          </div>
          <div className={classes.hudDivider}/>
          <div className={classes.wordboxContainer}>
            <WordBox word={word} isDrawing={props.isDrawing} showRight={showRight}/>
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
        <div className={classes.hudRow2}>
          <div className={classes.roundclockContainer}>
            <RoundClock maxTime={props.roundTime}/>
          </div>
          <div className={classes.hudDivider}/>
          <div className={classes.bonusclockContainer}>
            <BonusClock maxTime={props.bonusTime}/>
          </div>
          <div className={classes.hudDivider}/>
          <div className={classes.passbuttonContainer}>
            <PassButton isDrawing={props.isDrawing}/>
          </div>
        </div>
      </div>

      {/* ── Play area ── */}
      <div className={classes.playArea}>

        <div className={`${classes.chatPanel} ${activeTab === 'chat' ? classes.tabVisible : classes.tabHidden}`}>
          <MessageHolder teamColor={props.teamColor} />
          <MessageInput isDrawing={props.isDrawing}/>
        </div>

        <div className={`${classes.canvasPanel} ${activeTab === 'canvas' ? classes.tabVisible : classes.tabHidden}`}>
          <CanvasRoom isDrawing={props.isDrawing} word={word}/>
        </div>

        <div className={`${classes.sidePanel} ${activeTab === 'team' ? classes.tabVisible : classes.tabHidden}`}>
          <PlayerTags
            teamTags={props.teamTags}
            oppTags={props.oppTags}
            teamColor={props.teamColor}
            oppColor={props.oppColor}/>
          <AttackZone maxTime={props.attackTime} />
        </div>

      </div>

      {/* ── Tab bar (mobile only) ── */}
      <nav className={classes.tabBar}>
        <button
          className={`${classes.tab} ${activeTab === 'canvas' ? classes.tabActive : ''}`}
          onClick={() => setActiveTab('canvas')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          <span>Canvas</span>
        </button>
        <button
          className={`${classes.tab} ${activeTab === 'chat' ? classes.tabActive : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>Chat</span>
        </button>
        <button
          className={`${classes.tab} ${activeTab === 'team' ? classes.tabActive : ''}`}
          onClick={() => setActiveTab('team')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>Team</span>
        </button>
      </nav>

    </div>
  )
}
export default GameRoom
