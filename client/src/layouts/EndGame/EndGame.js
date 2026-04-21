import socket from '../../context/socket.js'
import { useEffect, useState } from 'react'
import classes from './EndGame.module.css'

const DURATION = 8

const EndGame = ({ totalRedPoints, totalBluePoints }) => {
  const [visible, setVisible] = useState(false)
  const [countdown, setCountdown] = useState(DURATION)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))

    const timer = setTimeout(() => socket.emit('backtoWaitRoom'), DURATION * 1000)
    const tick = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000)

    return () => { clearTimeout(timer); clearInterval(tick) }
  }, [])

  const redWins = totalRedPoints > totalBluePoints
  const blueWins = totalBluePoints > totalRedPoints
  const tie = !redWins && !blueWins

  const winnerColor = redWins ? '#ff3b2d' : blueWins ? '#2df1ff' : '#e6edf3'

  return (
    <div className={`${classes.container} ${visible ? classes.fadeIn : ''}`}>

      <div className={classes.winnerBanner}>
        <p className={classes.eyebrow}>GAME OVER</p>
        <h1 className={classes.winnerText} style={{ color: winnerColor }}>
          {redWins && 'RED TEAM WINS'}
          {blueWins && 'BLUE TEAM WINS'}
          {tie && "IT'S A TIE"}
        </h1>
        {tie && <p className={classes.tieNote}>A tie? Seriously?</p>}
      </div>

      <div className={classes.scores}>
        <div className={`${classes.scoreCard} ${redWins ? classes.winnerCard : ''}`}
          style={redWins ? { '--glow': '#ff3b2d' } : {}}>
          <span className={classes.teamLabel} style={{ color: '#ff3b2d' }}>RED</span>
          <span className={classes.scoreNum}>{totalRedPoints}</span>
          {redWins && <span className={classes.crown}>👑</span>}
        </div>

        <div className={classes.divider} />

        <div className={`${classes.scoreCard} ${blueWins ? classes.winnerCard : ''}`}
          style={blueWins ? { '--glow': '#2df1ff' } : {}}>
          <span className={classes.teamLabel} style={{ color: '#2df1ff' }}>BLUE</span>
          <span className={classes.scoreNum}>{totalBluePoints}</span>
          {blueWins && <span className={classes.crown}>👑</span>}
        </div>
      </div>

      <div className={classes.footer}>
        <p className={classes.countdownText}>Returning to lobby in {countdown}s</p>
        <div className={classes.progressTrack}>
          <div
            className={classes.progressBar}
            style={{
              width: `${(countdown / DURATION) * 100}%`,
              background: winnerColor,
            }}
          />
        </div>
      </div>

    </div>
  )
}

export default EndGame
