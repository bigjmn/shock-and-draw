import {useState, useEffect} from 'react'
import socket from '../../context/socket.js'
import JoinTeam from '../../components/JoinTeam/JoinTeam.js'
import HostButton from '../../components/HostButton/HostButton.js'
import NameInput from '../../components/NameInput/NameInput.js'

import classes from './WaitRoom.module.css'


const Waitroom =
({players, setPlayers, setBonusTime, setRoundTime, setAttackTime, roundTime, setNumRounds, numRounds, bonusTime, attackTime, username, setUsername}) => {

  const [host, setHost] = useState(false)
  const [roomcode, setRoomcode] = useState(null)

  const [undecided, setUndecided] = useState(true)

  const handleRoomData = (playerlist) => setPlayers(playerlist)

  useEffect(() => {
    socket.emit('getRoomData')
  }, [])

  useEffect(() => {
    socket.on('takeRoomData', (data) => {
      handleRoomData(data.players)
      hostCheck(data.players)
    })
    socket.on('takeHost', () => {
      setHost(true)
    })
    socket.on('takeTimerData', (data) => {
      setAttackTime(data.attacktime)
      setBonusTime(data.bonustime)
      setRoundTime(data.roundtime)
    })
    socket.on('takeNumRounds', (data) => {
      setNumRounds(data.numrounds)
    })
    socket.on('toGameroom', () => {
      console.log('gettinggameroom')
      socket.emit('getPreview')
    })
    socket.on('takeRoomCode', (data) => {
      setRoomcode(data.roomcode)
    })

    return () => {
      socket.off('takeRoomData')
      socket.off('takeHost')
      socket.off('takeTimerData')
      socket.off('takeNumRounds')
      socket.off('toGameroom')
      socket.off('takeRoomCode')
    }
  })

  const countcolors = (userArray, col) => {
    let userArr = userArray.filter(user => user.username != '')
    let totcount = userArr.reduce((tot, c) => (c.teamcolor == col ? tot+1 : tot), 0)
    console.log(totcount)
    return totcount
  }

  const hostCheck = (users) => {
    let noTeam = false;
    if (countcolors(users, 'none') > 0) noTeam = true;
    if (countcolors(users, 'red') < 2) noTeam = true;
    if (countcolors(users, 'blue') < 2) noTeam = true;
    setUndecided(noTeam)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('giveTimerData', {roundtime:roundTime, bonustime:bonusTime, attacktime:attackTime})
  }

  return(
    <div className={classes.wrapper}>

      <div className={classes.header}>
        <span className={classes.roomLabel}>ROOM CODE</span>
        <h1 className={classes.roomCode}>{roomcode ?? '—'}</h1>
      </div>

      <div className={classes.teamsGrid}>

        {/* Red Team */}
        <div className={`${classes.teamColumn} ${classes.redColumn}`}>
          <div className={classes.teamHeader}>
            <h2 className={classes.teamName} style={{color:'#ff3b2d'}}>RED TEAM</h2>
            <JoinTeam color='red' username={username}/>
          </div>
          <div className={classes.playerList}>
            {players.map((player) => (
              player.teamcolor === 'red' &&
              <div className={`${classes.playerTag} ${classes.redTag}`} key={player.id}>
                {player.username}
              </div>
            ))}
          </div>
        </div>

        {/* Middle / Undecided */}
        <div className={classes.midColumn}>
          <div className={classes.nameSection}>
            <h3 className={classes.nameLabel}>Pick a Username</h3>
            <div className={classes.nameInputWrapper}>
              <NameInput setUsername={setUsername} playernames={players.map(p => p.username)}/>
            </div>
          </div>
          <div className={classes.undecidedList}>
            {players.map((player) => (
              player.teamcolor === 'none' &&
              <div className={classes.playerTagNeutral} key={player.id}>
                {player.username}
              </div>
            ))}
          </div>
        </div>

        {/* Blue Team */}
        <div className={`${classes.teamColumn} ${classes.blueColumn}`}>
          <div className={classes.teamHeader}>
            <h2 className={classes.teamName} style={{color:'#2df1ff'}}>BLUE TEAM</h2>
            <JoinTeam color='blue' username={username}/>
          </div>
          <div className={classes.playerList}>
            {players.map((player) => (
              player.teamcolor === 'blue' &&
              <div className={`${classes.playerTag} ${classes.blueTag}`} key={player.id}>
                {player.username}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Settings + Start */}
      <div className={classes.bottomBar}>
        <form className={classes.settingsRow} onSubmit={handleSubmit}>
          <label className={classes.settingLabel}>
            ROUND
            <select className={classes.settingSelect} value={roundTime} onChange={(e) => socket.emit('changeRoundTime', {time:e.target.value})}>
              <option value={90}>90s</option>
              <option value={180}>180s</option>
              <option value={300}>300s</option>
            </select>
          </label>
          <label className={classes.settingLabel}>
            BONUS
            <select className={classes.settingSelect} value={bonusTime} onChange={(e) => socket.emit('changeBonusTime', {time:e.target.value})}>
              <option value={20}>20s</option>
              <option value={30}>30s</option>
              <option value={40}>40s</option>
            </select>
          </label>
          <label className={classes.settingLabel}>
            ATTACK
            <select className={classes.settingSelect} value={attackTime} onChange={(e) => socket.emit('changeAttackTime', {time:e.target.value})}>
              <option value={20}>20s</option>
              <option value={30}>30s</option>
              <option value={40}>40s</option>
            </select>
          </label>
          <label className={classes.settingLabel}>
            ROUNDS
            <select className={classes.settingSelect} value={numRounds} onChange={(e) => socket.emit('changeNumRounds', {numrounds:e.target.value})}>
              {Array.from(Array(12).keys()).map(i => (
                <option key={i} value={i+1}>{i+1}</option>
              ))}
            </select>
          </label>
        </form>

        {host && <HostButton playerUndecided={undecided} />}
      </div>

    </div>
  )
}

export default Waitroom
