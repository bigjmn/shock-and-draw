import React from 'react'
import NewColorPanel from '../ColorPanel/NewColorPanel.js'
import SizePanel from '../SizePanel/SizePanel.js'
import TrashButton from '../TrashButton/TrashButton.js'

import classes from './Controls.module.css'

const Controls = (props) => {
  return(
    <div className={classes.controlWrapper}>
      <div className={classes.colorWrapper}>
        <NewColorPanel handleColor={props.handleColor} />
      </div>
      <div className={classes.sizetrashWrapper}>


      <SizePanel handleSize={props.handleSize} />
      <TrashButton />
      </div>
    </div>
  )

}
export default Controls
