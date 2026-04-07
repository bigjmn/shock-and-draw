import {hideword} from '../../helpers.js'
import classes from './WordBox.module.css'

const WordBox = ({word, isDrawing, showRight}) => {
  const hidden = hideword(word)

  if (showRight) return (
    <div className={classes.outerContainer}>
      <p className={classes.wordCorrect}>✔ {word}</p>
    </div>
  )

  if (isDrawing) return (
    <div className={classes.outerContainer}>
      <p className={classes.wordDrawing}>{word}</p>
    </div>
  )

  return (
    <div className={classes.outerContainer}>
      <p className={classes.wordHidden}>{hidden}</p>
    </div>
  )
}

export default WordBox
