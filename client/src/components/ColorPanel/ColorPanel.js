import React, {useState, useEffect} from 'react'
import socket from '../../context/socket.js'
import classes from './ColorPanel.module.css'

const ColorPanel = (props) => {



  const [color, setColor] = useState("#000000")

  const [colorOptions, setColorOptions] = useState(true)

  const handleChange = (e) => {
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
      let oldcolor = document.querySelector('input[name="coloroption"]:checked').value;
      setColor(oldcolor)
      props.handleColor(oldcolor)

    })
    return () => {
      socket.off('nocolor')
      socket.off('nocolorclear')
    }

  })



  return(
    <div className={classes.colorHolder}>


        <form onChange={handleChange} className={classes.colorForm}>
          <label className={classes.container}>
            <input type="radio" name="coloroption" value="#000000"/>
            <span style={{backgroundColor:"#000000"}} className={classes.checkmark}></span>
          </label>


          <label className={classes.container}>
            <input type="radio" name="coloroption" value={colorOptions ? "#ff0000" : '#202020'}/>
            <span style={{backgroundColor:colorOptions ? "#ff0000" : '#202020'}} className={classes.checkmark}></span>
          </label>

          <label className={classes.container}>
            <input type="radio" name="coloroption" value={colorOptions ? "#ff7900" : '#404040'}/>
            <span style={{backgroundColor:colorOptions ? "#ff7900" : "#404040"}} className={classes.checkmark}></span>
          </label>
          <label className={classes.container}>
            <input type="radio" name="coloroption" value={colorOptions ? "#ffe800" : '#606060'}/>
            <span style={{backgroundColor:colorOptions ? "#ffe800" : '#606060'}} className={classes.checkmark}></span>
          </label>


          <label className={classes.container}>
            <input type="radio" name="coloroption" value={colorOptions ? "#30cb00" : '#808080'}/>
            <span style={{backgroundColor:colorOptions ? "#30cb00" : '#808080'}} className={classes.checkmark}></span>
          </label>
          <label className={classes.container}>
            <input type="radio" name="coloroption" value={colorOptions ? "#0059ff" : "#a0a0a0"}/>
            <span  style={{backgroundColor:colorOptions ? "#0059ff" : "#a0a0a0"}}className={classes.checkmark}></span>
          </label>
          <label className={classes.container}>
            <input type="radio" name="coloroption" value={colorOptions ? "#ff00e3" : "#c0c0c0"}/>
            <span style={{backgroundColor:colorOptions ? "#ff00e3" : "#c0c0c0"}} className={classes.checkmark}></span>
          </label>
          <label className={classes.container}>
            <input type="radio" name="coloroption" value={colorOptions ? "#a100d4" : "#d0d0d0"}/>
            <span style={{backgroundColor:colorOptions ? "#a100d4" : "#d0d0d0"}} className={classes.checkmark}></span>
          </label>
          <label className={classes.container}>
            <input type="radio" name="coloroption" value={colorOptions ? "#a1705e" : "#e0e0e0"}/>
            <span style={{backgroundColor:colorOptions ? "#a1705e" : "#e0e0e0"}} className={classes.checkmark}></span>
          </label>
          <label className={classes.container}>
            <input type="radio" name="coloroption" value="#ffffff"/>
            <span style={{backgroundColor:"#ffffff"}} className={classes.checkmark}></span>
          </label>

        </form>



    </div>

  )
}
export default ColorPanel
