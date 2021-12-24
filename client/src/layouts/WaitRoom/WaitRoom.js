import {useState, useEffect} from 'react'
import socket from '../../context/socket.js'
import JoinTeam from '../../components/JoinTeam/JoinTeam.js'
import HostButton from '../../components/HostButton/HostButton.js'
import NameInput from '../../components/NameInput/NameInput.js'

import classes from './WaitRoom.module.css'

const Waitroom =
({players, setPlayers, setGamestage, setBonusTime, setRoundTime, setAttackTime, roundTime, setNumRounds, numRounds, bonusTime, attackTime, username, setUsername, setTeamColor}) => {

  const [host, setHost] = useState(false)

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

    return () => {
      socket.off('takeRoomData')
      socket.off('takeHost')
      socket.off('takeTimerData')
      socket.off('takeNumRounds')
      socket.off('toGameroom')
    }

  })
  const countcolors = (userArr, col) => {
    let totcount = userArr.reduce((tot, c) => (c.teamcolor == col ? tot+1 : tot), 0)
    console.log(totcount)
    return totcount
  }





  const hostCheck = (users) => {
    let noTeam = false;
    if (countcolors(users, 'none') > 0){
      noTeam = true;
    }
    if (countcolors(users, 'red') < 2){
      noTeam = true;
    }
    if (countcolors(users, 'blue') < 2){
      noTeam = true;
    }




    setUndecided(noTeam)
  }

  const handleBonusTimeChange = (e) => setBonusTime(e.target.value)
  const handleRoundTimeChange = (e) => setRoundTime(e.target.value)
  const handleAttackTimeChange = (e) => setAttackTime(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('giveTimerData', {roundtime:roundTime, bonustime:bonusTime, attacktime:attackTime})
  }







  return(
    <div>

      <div className={classes.teamListContainer}>

        <div className={classes.teamList} style={{backgroundColor:"#ff3b2d"}}>
          <JoinTeam color='red' />
          {players.map((player) => (
            <div className='team-players' key={player.id}>
              {player.teamcolor == 'red' && <h2>{player.username}</h2>}
            </div>
          ))}

        </div>



        <div className={classes.teamList}>
          <div className={classes.pickNameContainer}>
          <h3>Pick a Username</h3>
          <NameInput setUsername={setUsername} playernames={players.map(player => player.username)}/>
          </div>
          {players.map((player) => (
            <div className='team-players' key={player.id}>
              {player.teamcolor == 'none' && <h2>{player.username}</h2>}
            </div>
          ))}

        </div>

        <div className={classes.teamList} style={{backgroundColor:"#2df1ff"}}>
          <JoinTeam color='blue' />
          {players.map((player) => (
            <div className='team-players' key={player.id}>
              {player.teamcolor == 'blue' && <h2>{player.username}</h2>}
            </div>
          ))}

        </div>

        <div className={classes.hostZoneContainer} style={{backgroundColor:"#e2e2e2"}}>
          <form className={classes.optionsContainer} onSubmit = {handleSubmit}>
            <label>round time
            <select value={roundTime} onChange={(e) => socket.emit('changeRoundTime', {time:e.target.value})}>
              <option value={90}>90</option>
              <option value={180}>180</option>
              <option value={300}>300</option>
            </select>
            </label>

            <label>bonus time
            <select value={bonusTime} onChange={(e) => socket.emit('changeBonusTime', {time:e.target.value})}>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
            </select>
            </label>

            <label>attack time
            <select value={attackTime} onChange={(e) => socket.emit('changeAttackTime', {time:e.target.value})}>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
            </select>
            </label>

            <label>Number of Rounds
            <select value={numRounds} onChange={(e) => socket.emit('changeNumRounds', {numrounds:e.target.value})}>
              {Array.from(Array(12).keys()).map(i => (
                <option value={i+1}>{i+1}</option>
              ))}

            </select>
            </label>


          </form>

          {host && <HostButton playerUndecided={undecided} />}
        </div>

      </div>
    </div>
  )
}

export default Waitroom
