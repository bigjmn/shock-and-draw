import React, { useState, useEffect } from 'react'
import socket from '../../context/socket.js'
import Canvas from '../../components/Canvas/Canvas.js'
import RecCanvas from '../../components/RecCanvas/RecCanvas.js'


const CanvasRoom = ({isDrawing, word}) => {



  return (
    <div className='bigboy'>
      {isDrawing ? <Canvas word={word}/> : <RecCanvas word={word}/>}
    </div>
  )

}
export default CanvasRoom
