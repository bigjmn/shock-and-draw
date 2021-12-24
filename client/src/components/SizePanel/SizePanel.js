import React, {useState, useEffect} from 'react'
import socket from '../../context/socket.js'
import classes from './SizePanel.module.css'

const SizePanel = (props) => {


  const [sizeOptions, setSizeOptions] = useState(true)

  const handleChange = (e) => props.handleSize(e.target.value)

  useEffect(() => {
    socket.on('fathands', () => {
      props.handleSize(40)
      setSizeOptions(false)
    })
    socket.on('fathandsclear', () => {
      setSizeOptions(true)
      props.handleSize(5)
    })
    return () => {
      socket.off('fathands')
      socket.off('fathandsclear')
    }
  })

  return(
    <div className={classes.colorHolder}>
      <form onChange={handleChange} className={classes.sizeForm}>

      {sizeOptions && <label className={classes.container}>
    <input type="radio" name="coloroption" defaultChecked={true} value={5} />
    <span style={{width:"15px", height:"15px", top:"12px", left:"12px"}} className={classes.checkmark}></span>
  </label>}
  {sizeOptions && <label className={classes.container}>
    <input type="radio" name="coloroption" value={18}/>
    <span style={{width:"20px", height:"20px", top:"10px", left:"10px"}} className={classes.checkmark}></span>
  </label>}
{ sizeOptions && <label className={classes.container}>
    <input type="radio" name="coloroption" value={26}/>
    <span  style={{width:"25px", height:"25px", top:"8px", left:"8px"}}className={classes.checkmark}></span>
  </label>}
  <label className={classes.container}>
    <input type="radio" name="coloroption" value={40}/>
    <span  style={{width:"30px", height:"30px", top:"5px", left:"5px"}}className={classes.checkmark}></span>
  </label>

  </form>

    </div>
  )
}
export default SizePanel
