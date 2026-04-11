import { useEffect, useState } from 'react'
import socket from '../../context/socket.js'
import classes from './Recap.module.css'

const Recap = ({ round, totalRedPoints, totalBluePoints, redPoints, bluePoints, redDrawer, blueDrawer }) => {
  const [redHistory, setRedHistory] = useState([])
  const [blueHistory, setBlueHistory] = useState([])
  const [shownRedPoints, setShownRedPoints] = useState(totalRedPoints)
  const [shownBluePoints, setShownBluePoints] = useState(totalBluePoints)
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    socket.emit('getwordhistory')
  }, [])

  useEffect(() => {
    socket.on('takehistory', (data) => {
      if (!data.oldred && !data.oldblue) {
        // Done revealing — fade out then transition
        setExiting(true)
        setTimeout(() => socket.emit('getPreview'), 700)
        return
      }
      setRedHistory(h => data.oldred ? [...h, data.oldred] : h)
      setBlueHistory(h => data.oldblue ? [...h, data.oldblue] : h)
      if (data.oldred?.success) setShownRedPoints(p => p + 1)
      if (data.oldblue?.success) setShownBluePoints(p => p + 1)
    })
    return () => { socket.off('takehistory') }
  })

  return (
    <div className={`${classes.recapContainer} ${visible ? classes.fadeIn : ''} ${exiting ? classes.fadeOut : ''}`}>
      <div className={classes.heading}>END OF ROUND {round}</div>

      <div className={classes.columns}>
        {/* Red column */}
        <div className={classes.column}>
          <div className={classes.drawerName} style={{ color: 'var(--red)' }}>{redDrawer}</div>
          <div className={classes.teamScore} style={{ color: 'var(--red)' }}>{shownRedPoints}</div>
          <div className={classes.wordList}>
            {redHistory.map((entry, i) => (
              <div key={i} className={`${classes.wordCard} ${entry.success ? classes.success : classes.fail}`}
                style={{ animationDelay: `${i * 0.05}s` }}>
                <span className={classes.wordText}>{entry.word}</span>
                <span className={classes.wordIcon}>{entry.success ? '✔' : '✘'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={classes.columnDivider} />

        {/* Blue column */}
        <div className={classes.column}>
          <div className={classes.drawerName} style={{ color: 'var(--blue)' }}>{blueDrawer}</div>
          <div className={classes.teamScore} style={{ color: 'var(--blue)' }}>{shownBluePoints}</div>
          <div className={classes.wordList}>
            {blueHistory.map((entry, i) => (
              <div key={i} className={`${classes.wordCard} ${entry.success ? classes.success : classes.fail}`}
                style={{ animationDelay: `${i * 0.05}s` }}>
                <span className={classes.wordText}>{entry.word}</span>
                <span className={classes.wordIcon}>{entry.success ? '✔' : '✘'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recap
