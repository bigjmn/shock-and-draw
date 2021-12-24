import React, {useState, useEffect} from 'react'
import socket from '../../context/socket.js'
import classes from './NewColorPanel.module.css'

const NewColorPanel = (props) => {



  const [color, setColor] = useState("#000000")

  const [colorOptions, setColorOptions] = useState(true)
  const topRow = colorOptions ? ['#ffffff', '#c1c1c1', '#ef130b', '#ff7100', '#ffe400', '#00cc00', '#00b2ff', '#231fd3', '#a300ba', '#d37caa', '#a0522d', '#592f2a', '#ecbcb4'] :
  ['#ffffff', '#d8d8d8', '#cfcfcf', '#c6c6c6', '#bdbdbd', '#b4b4b4', '#ababab', '#a2a2a2', '#999999', '#909090', '#878787', '#7e7e7e', '#757575']
  const bottomRow = colorOptions ? ['#000000', '#4c4c4c', '#740b07', '#c23800', '#e8a200', '#005510', '#00569e', '#0e0865', '#550069', '#a75574', '#63300d', '#492f31', '#d1a3a4'] :
  ['#000000', '#090909', '#121212', '#1b1b1b', '#242424', '#2d2d2d', '#363636', '#3f3f3f', '#484848', '#515151', '#5a5a5a', '#636363', '#6c6c6c']


  const handleClick = (e) => {
    setColor(e.target.value)
    props.handleColor(e.target.value)
  }

  useEffect(() => {
    socket.on('nocolor', () => {
      setColor("#000000")
      props.handleColor("#000000")
      setColorOptions(false)
    })
    socket.on('nocolorclear', () => {
      setColorOptions(true)
      setColor("#000000")
      props.handleColor("#000000")

    })
    return () => {
      socket.off('nocolor')
      socket.off('nocolorclear')
    }

  })



  return(
    <div className={classes.colorContainer}>

    <div className={classes.colorDisplay} style={{backgroundColor:color}}/>
    <div className={classes.colorHolder}>
      <div className={classes.colorRow}>
        {topRow.map((newcolor, i) => (
          <button key={i} style={{backgroundColor:newcolor}} className={classes.colorButton} value={newcolor} onClick={handleClick}></button>
        ))}
      </div>
      <div className={classes.colorRow}>
        {bottomRow.map((newcolor, i) => (
          <button key={i} style={{backgroundColor:newcolor}} className={classes.colorButton} value={newcolor} onClick={handleClick}></button>
        ))}
      </div>





    </div>
    </div>

  )
}
export default NewColorPanel
