import {useState, useEffect} from 'react'
import classes from './FadeControl.module.css'

const FadeControl = ({fadeCanvas}) => {

  useEffect(() => {

    let int = setInterval(() => {
      fadeCanvas()
    }, 50)
    return () => clearInterval(int)
  })

  return (
    <div className={classes.outerContainer}>
    </div>
  )
}
export default FadeControl
