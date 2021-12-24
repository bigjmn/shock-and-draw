import classes from './Message.module.css'

const Message = ({message}) =>{

  return message.passmessage ? (
    <div className={classes.messageHolder}>
      <p><span className={classes.nameStyle}>{message.name}</span>  passed on the word <span className={classes.passStyle}>{message.guess}</span></p>
    </div>
  ) : message.correct ? (
    <div className={classes.messageHolder}>
      <p><span className={classes.nameStyle}>{message.name}</span> got it! the word was <span className={classes.wordStyle}>{message.guess}</span></p>
    </div>

    ) : message.censored ? (
      <div className={classes.messageHolder}>
        <p><span className={classes.nameStyle}>{message.name}: </span><span className={classes.redactStyle}>REDACTED</span></p>
      </div>
    ) : (
      <div className={classes.messageHolder}>
        <p><span className={classes.nameStyle}>{message.name}: </span>{message.guess}</p>
      </div>
    )



}
export default Message
