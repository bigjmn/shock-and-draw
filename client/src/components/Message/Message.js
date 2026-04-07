import classes from './Message.module.css'

const Message = ({message}) => {

  if (message.passmessage) return (
    <div className={`${classes.messageHolder} ${classes.passRow}`}>
      <p className={classes.messageText}>
        <span className={classes.nameStyle}>{message.name}</span> passed on <span className={classes.passStyle}>{message.guess}</span>
      </p>
    </div>
  )

  if (message.correct) return (
    <div className={`${classes.messageHolder} ${classes.correctRow}`}>
      <p className={classes.messageText}>
        <span className={classes.nameStyle}>{message.name}</span> got it! <span className={classes.wordStyle}>{message.guess} ✔</span>
      </p>
    </div>
  )

  if (message.censored) return (
    <div className={`${classes.messageHolder} ${classes.normalRow}`}>
      <p className={classes.messageText}>
        <span className={classes.nameStyle}>{message.name}: </span>
        <span className={classes.redactStyle}>REDACTED</span>
      </p>
    </div>
  )

  return (
    <div className={`${classes.messageHolder} ${classes.normalRow}`}>
      <p className={classes.messageText}>
        <span className={classes.nameStyle}>{message.name}: </span>{message.guess}
      </p>
    </div>
  )
}

export default Message
