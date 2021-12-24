import {hideword} from '../../helpers.js'
import classes from './WordBox.module.css'
const WordBox = ({word, isDrawing}) => {
  const hidden = hideword(word)

  return isDrawing ? (
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
