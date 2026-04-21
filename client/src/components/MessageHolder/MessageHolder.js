import React, {useState, useEffect, useRef} from 'react'
import socket from '../../context/socket.js'
import Message from '../Message/Message.js'
import attacklist from '../AttackZone/attacklist.js'
import classes from './MessageHolder.module.css'

const MessageHolder = ({ teamColor }) => {

  const [messages, setMessages] = useState([])

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

useEffect(() => {
  scrollToBottom()
}, [messages]);

  useEffect(() => {
    const handleResponse = (data) => setMessages(old => [...old, data])
    const handleAttackBounce = () => socket.emit('giveAttack')
    const handleTakeAttack = (data) => {
      const attackName = attacklist[data.type]?.title ?? 'Unknown Attack'
      const weWereHit = data.color === teamColor
      setMessages(old => [...old, { attackMessage: true, weWereHit, attackName }])
    }

    socket.on('response', handleResponse)
    socket.on('attackBounce', handleAttackBounce)
    socket.on('takeAttack', handleTakeAttack)

    return () => {
      socket.off('response', handleResponse)
      socket.off('attackBounce', handleAttackBounce)
      socket.off('takeAttack', handleTakeAttack)
    }
  })

  return(
    <div className={classes.messageWrapper}>
      {messages.map((message, i) => (

          <Message key={i} message={message}/>

      ))}

      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageHolder
