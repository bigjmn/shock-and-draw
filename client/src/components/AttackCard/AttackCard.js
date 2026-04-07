import {useState, useEffect} from 'react'
import classes from './AttackCard.module.css'

const AttackCard = ({type, color, timestamp, maxTime, filterOut}) => {

  const [secs, setSecs] = useState(maxTime)

  useEffect(() => {
    let int = setInterval(() => {
      let timeleft = maxTime - (Math.round((Date.now() - timestamp) / 1000))
      if (timeleft <= 0) {
        filterOut(timestamp)
      }
      setSecs(timeleft)
    }, 1000)
    return () => clearInterval(int)
  }, [])

  const pct = Math.max(0, (secs / maxTime) * 100)

  // Derive a legible accent from the team color
  const isRed = color === '#ff3b2d' || color === 'red'
  const accentColor = isRed ? '#ff3b2d' : '#2df1ff'
  const bgColor = isRed ? 'rgba(255,59,45,0.08)' : 'rgba(45,241,255,0.08)'

  return (
    <div className={classes.cardContainer} style={{background: bgColor, borderLeft: `3px solid ${accentColor}`}}>
      <div className={classes.cardHeader}>
        <h2 className={classes.cardTitle}>{type.title}</h2>
        <span className={classes.cardTimer} style={{color: accentColor}}>{secs}</span>
      </div>
      <p className={classes.cardExplainer}>{type.explainer}</p>
      <p className={classes.cardFlavor}>{type.flavor}</p>
      <div className={classes.timerBar} style={{width: pct + '%', background: accentColor, opacity: 0.5}} />
    </div>
  )
}

export default AttackCard
