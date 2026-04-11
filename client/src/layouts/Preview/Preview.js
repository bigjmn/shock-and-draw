import { useEffect, useState, useRef } from 'react'
import classes from './Preview.module.css'
import socket from '../../context/socket.js'

const COUNTDOWN = 5

const Preview = ({ round, redDrawer, blueDrawer, startTime }) => {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [countdown, setCountdown] = useState(COUNTDOWN)
  const intervalRef = useRef(null)

  useEffect(() => {
    // Fade in
    const raf = requestAnimationFrame(() => setVisible(true))

    // Compute how many seconds have already elapsed since the server fired
    const elapsed = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0
    const initial = Math.max(0, COUNTDOWN - elapsed)
    setCountdown(initial)

    if (initial <= 0) {
      launch()
      return () => cancelAnimationFrame(raf)
    }

    intervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          launch()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      cancelAnimationFrame(raf)
      clearInterval(intervalRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const launch = () => {
    setExiting(true)
    setTimeout(() => socket.emit('getRoundData'), 600)
  }

  return (
    <div className={`${classes.previewContainer} ${visible ? classes.fadeIn : ''} ${exiting ? classes.fadeOut : ''}`}>
      <div className={classes.roundLabel}>ROUND</div>
      <div className={classes.roundNum}>{round}</div>

      <div className={classes.divider} />

      <div className={classes.matchupLabel}>DRAWERS</div>
      <div className={classes.matchup}>
        <span className={classes.redName}>{redDrawer}</span>
        <span className={classes.vs}>vs</span>
        <span className={classes.blueName}>{blueDrawer}</span>
      </div>

      <div className={classes.divider} />

      <div className={classes.getReady}>GET READY!</div>
      <div className={`${classes.countdownNum} ${countdown <= 2 ? classes.urgent : ''}`} key={countdown}>
        {countdown}
      </div>
    </div>
  )
}

export default Preview
