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
    socket.on('response', (data) => {
      setMessages((oldMessages) => [...oldMessages, data])

    })
    socket.on('attackBounce', () => {
      socket.emit('giveAttack')
    })
    socket.on('takeAttack', (data) => {
      const attackName = attacklist[data.type]?.title ?? 'Unknown Attack'
      const weWereHit = data.color === teamColor
      setMessages(old => [...old, {
        attackMessage: true,
        weWereHit,
        attackName
      }])
    })

    return () => {
      socket.off('response')
      socket.off('attackBounce')
      socket.off('takeAttack')
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
