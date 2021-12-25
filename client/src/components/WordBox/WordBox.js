import {hideword} from '../../helpers.js'
import classes from './WordBox.module.css'
const WordBox = ({word, isDrawing, showRight}) => {
  const hidden = hideword(word)

  return showRight ? (
    <div className={classes.outerContainer}>
      <h1 style={{color:'green'}}>{word}</h1>
    </div>
  ) : isDrawing ? (
    <div className={classes.outerContainer}>
      <h1>{word}</h1>
    </div>
  ) : (
    <div className={classes.outerContainer}>
      <h2>{hidden}</h2>
    </div>
  )




}
export default WordBox
