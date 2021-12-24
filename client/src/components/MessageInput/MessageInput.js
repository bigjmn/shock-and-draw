import React, { useState, useEffect } from 'react'
import classes from './MessageInput.module.css'
import socket from '../../context/socket.js'
import {reversify} from '../../helpers.js'

const MessageInput = ({isDrawing}) => {

  const [message, setMessage] = useState('')
  const [reversed, setReversed] = useState(false)


  const handleChange = (e) => setMessage(e.target.value)
  const handleSubmit = (e) => {
    e.preventDefault()
    let guess = reversed ? reversify(message) : message
    socket.emit('guess', {guess:guess})
    setMessage('')
  }

  useEffect(() => {
    socket.on('reverse', () => {
      setReversed(true)
    })
    socket.on('reverseclear', () => {
      setReversed(false)
    })
    return () => {
      socket.off('reverse')
      socket.off('reverseclear')
    }
  })

  return(
    <form className={classes.guessform} onSubmit={handleSubmit}>
      <input disabled={isDrawing} maxLength={32} className={classes.guessInput} type='text' value={message} onChange={handleChange}></input>
    </form>
  )
}

export default MessageInput
