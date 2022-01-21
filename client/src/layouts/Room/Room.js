import {useState, useEffect} from 'react'
import socket from '../../context/socket.js'
import Waitroom from '../Waitroom/Waitroom.js'
import Preview from '../Preview/Preview.js'
import GameRoom from '../GameRoom/GameRoom.js'
import Recap from '../Recap/Recap.js'
import EndGame from '../EndGame/EndGame.js'
const Room = ({setOnmute, onmute}) => {

  const [players, setPlayers] = useState([])
  const [redDrawer, setRedDrawer] = useState('')
  const [blueDrawer, setBlueDrawer] = useState('')
  const [round, setRound] = useState(0)
  const [firstword, setFirstword] = useState('')
  const [username, setUsername] = useState('')
  const [teamColor, setTeamColor] = useState('')
  const [oppColor, setOppColor] = useState('')

  const [isDrawing, setIsDrawing] = useState(false)

  const [roundTime, setRoundTime] = useState(180)
  const [attackTime, setAttackTime] = useState(20)
  const [bonusTime, setBonusTime] = useState(20)
  const [totalRedPoints, setTotalRedPoints] = useState(0)
  const [totalBluePoints, setTotalBluePoints] = useState(0)
  const [numRounds, setNumRounds] = useState(4)

  const [redPoints, setRedPoints] = useState(0)
  const [bluePoints, setBluePoints] = useState(0)

  const [gamestage, setGamestage] = useState('waiting')

  const [payload, setPayload] = useState(null)
  const [teamTags, setTeamTags] = useState(null)
  const [oppTags, setOppTags] = useState(null)



  useEffect(() => {
    socket.on('previewLaunch', (data) => {
      setTotalRedPoints((currentTot) => currentTot + redPoints)
      setTotalBluePoints((currentTot) => currentTot + bluePoints)
      setRedPoints(0)
      setBluePoints(0)
      setRound(data.payload.round)
      setRedDrawer(data.payload.reddrawer)
      setBlueDrawer(data.payload.bluedrawer)
      setGamestage('preview')
    })
    socket.on('takeRoundData', (data) => {
      setIsDrawing(data.payload.isDrawing)
      setFirstword(data.payload.firstword)
      setTeamTags(data.payload.teamtags)
      setOppTags(data.payload.opptags)
      setTeamColor(data.payload.color)
      setOppColor(data.payload.oppcolor)
      setGamestage('playing')
    })
    socket.on('takeRecap', () => {
      setGamestage('recap')
    })
    socket.on('endGame', () => {
      setTotalRedPoints((currentTot) => currentTot + redPoints)
      setTotalBluePoints((currentTot) => currentTot + bluePoints)
      setRedPoints(0)
      setBluePoints(0)
      setGamestage('endgame')
    })
    socket.on('toWaitRoom', () => {
      setTotalRedPoints(0)
      setTotalBluePoints(0)
      setRedDrawer(0)
      setBlueDrawer(0)
      setGamestage('waiting')
    })

    return () => {
      socket.off('previewLaunch')
      socket.off('takeRoundData')
      socket.off('takeRecap')
      socket.off('endGame')
      socket.off('toWaitRoom')
    }
  })






  return (gamestage=='waiting') ?
  (
    <div>
      <Waitroom players={players}
        setPlayers={setPlayers}
        setGamestage={setGamestage}
        setRedDrawer={setRedDrawer}
        username={username}
        setUsername={setUsername}
        setOnmute={setOnmute}
        onmute={onmute}




        roundTime={roundTime}
        attackTime={attackTime}
        bonusTime={bonusTime}
        numRounds={numRounds}
        setRoundTime={setRoundTime}
        setAttackTime={setAttackTime}
        setBonusTime={setBonusTime}
        setNumRounds={setNumRounds}/>
    </div>
  ) : (gamestage == 'preview') ?
  (
    <Preview round={round} redDrawer={redDrawer} blueDrawer={blueDrawer}/>
  ) : (gamestage == 'playing') ?
  (
    <GameRoom isDrawing={isDrawing} roundTime={roundTime}
    attackTime={attackTime}
    bonusTime={bonusTime}
    redPoints={redPoints}
    bluePoints={bluePoints}
    setRedPoints={setRedPoints}
    setBluePoints={setBluePoints}
    teamTags = {teamTags}
    oppTags = {oppTags}
    teamColor={teamColor}
    oppColor={oppColor}
    firstword={firstword}
    round={round}
    setOnmute={setOnmute}
    onmute={onmute}
    numRounds={numRounds}/>
) : (gamestage == 'recap') ?
(
  <Recap totalRedPoints={totalRedPoints}
    totalBluePoints={totalBluePoints}
    redPoints={redPoints}
    bluePoints={bluePoints}
    redDrawer={redDrawer}
    blueDrawer={blueDrawer}

    round={round} />

) : (gamestage == 'endgame') ?
(
  <EndGame totalRedPoints={totalRedPoints}
    totalBluePoints={totalBluePoints} />

) : (<div></div>)




}

export default Room
