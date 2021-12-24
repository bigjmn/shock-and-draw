import socket from '../../context/socket.js'
import { useEffect, useState } from 'react'

import AttackCard from '../AttackCard/AttackCard.js'
import attacklist from './attacklist.js'

import classes from './AttackZone.module.css'

const AttackZone = ({maxTime}) => {

  const [attacks, setAttacks] = useState([])

  const filterOut = (timestamp) => {
    socket.emit('clearAttack', {timestamp:timestamp})
    setAttacks(attacks => attacks.filter(x => (x.timestamp != timestamp)))
  }



  useEffect(() => {
    socket.on('takeAttack', (data) => {
      let attackPack = {
        timestamp: data.timestamp,
        color: data.color,
        type: attacklist[data.type]
      }
      setAttacks((oldAttackList) => [...oldAttackList, attackPack])
    })
    return () => {
      socket.off('takeAttack')
    }
  })

  return (
    <div className={classes.attackContainer}>
      {attacks.map((card) => (
        <div key={card.timestamp}>
          <AttackCard
            type={card.type}
            timestamp={card.timestamp}
            color={card.color}
            maxTime={maxTime}
            filterOut={filterOut}/>
        </div>
      ))}
    </div>
  )
}

export default AttackZone
