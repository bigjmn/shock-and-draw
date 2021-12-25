import socket from '../../context/socket.js'
import {useState} from 'react'

const NameInput = ({setUsername, playernames}) => {

  const [tempName, setTempName] = useState('')
  const [errMess, setErrMess] = useState('')



  const testValid = (name) => {
    if (name == ''){
      return;
    }
    if (playernames.includes(name)){
      setErrMess('That name is taken!')
      return;
    }
    setErrMess('')
    setUsername(name)
    socket.emit('newUsername', {username: name})


  }

  const handleSubmit = (e) => {
    e.preventDefault()
    testValid(tempName)
    setTempName('')
  }

  const handleChange = (e) => setTempName(e.target.value)

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' maxLength={12} onChange={handleChange} value={tempName}/>
      </form>
      <p>{errMess}</p>
    </div>

  )
}
export default NameInput
