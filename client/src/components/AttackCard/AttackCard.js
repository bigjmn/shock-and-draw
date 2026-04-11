import {useState, useEffect} from 'react'
import classes from './AttackCard.module.css'

const AttackCard = ({type, color, timestamp, maxTime, filterOut}) => {

  const [secs, setSecs] = useState(maxTime)
  const [isExpanded, setIsExpanded] = useState(true)

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

  useEffect(() => {
    const t = setTimeout(() => setIsExpanded(false), 3000)
    return () => clearTimeout(t)
  }, [])

  const pct = Math.max(0, (secs / maxTime) * 100)

  const isRed = color === '#ff3b2d' || color === 'red'
  const accentColor = isRed ? '#ff3b2d' : '#2df1ff'
  const bgColor = isRed ? 'rgba(255,59,45,0.08)' : 'rgba(45,241,255,0.08)'

  return (
    <div
      className={classes.cardContainer}
      style={{background: bgColor, borderLeft: `3px solid ${accentColor}`}}
      onClick={() => setIsExpanded(v => !v)}
    >
      <div className={classes.cardHeader}>
        <div className={classes.cardIconCircle}>
          <img src={type.icon} className={classes.cardIcon} alt="" />
        </div>
        <h2 className={classes.cardTitle}>{type.title}</h2>
        <span className={classes.cardTimer} style={{color: accentColor}}>{secs}</span>
      </div>
      <div className={`${classes.cardBody} ${isExpanded ? '' : classes.cardBodyCollapsed}`}>
        <div className={classes.cardBodyInner}>
          <p className={classes.cardExplainer}>{type.explainer}</p>
          <p className={classes.cardFlavor}>{type.flavor}</p>
          <div className={classes.timerBar} style={{width: pct + '%', background: accentColor, opacity: 0.5}} />
        </div>
      </div>
    </div>
  )
}

export default AttackCard
