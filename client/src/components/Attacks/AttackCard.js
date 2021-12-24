import {useState, useEffect} from 'react'

import classes from './AttackCard.module.css'

const AttackCard = ({card, attackset}) => {
  const [timing, setTiming] = useState(true)

  const handleAttackset = () => attackset(false)

  const endIt = () => {
    setTiming(false)
    handleAttackset()

  }

  return(
    <div className={classes.cardContainer}>
      <h1>{card.title}</h2>
      <h2>{card.explainer}</h3>
      <div className={classes.timerspot}>
        {timing && <Timer parentsetter={endIt}/> }
      </div>
      <h3>{card.flavor}</h3>

    </div>
  )

}



const Timer = ({parentsetter}) => {
  const [seconds, setSeconds] = useState(25)

  const handleSet = () => parentsetter()


  useEffect(() => {
    let interval = null
    interval = setInterval(() => {
      setSeconds(seconds => seconds -1)
      if (seconds <= 0){
         parentsetter(false)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [seconds])

  return(
    <div>
      <h2>{seconds}</h2>
    </div>
  )
}

export default AttackCard
