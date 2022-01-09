import React, {useState, useEffect, useRef} from 'react'
import socket from '../../context/socket.js'
import Message from '../Message/Message.js'
import classes from './MessageHolder.module.css'

const MessageHolder = () => {

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

    return () => {
      socket.off('response')
      socket.off('attackBounce')
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
