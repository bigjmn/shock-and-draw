import React, { useState, useEffect } from "react";
import Controls from "../Controls/Controls";
import socket from '../../context/socket.js'

import classes from './Canvas.module.css'

function Canvas() {
  const canvasRef = React.useRef(null);
  const parentRef = React.useRef(null);
  const [ctx, setCtx] = useState({});
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [drawing, setDrawing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("#000000");
  const [thickness, setThickness] = useState(5)
  const [activeTake, setActiveTake] = useState(false)

  const [cursorstyle, setCursorstyle] = useState("default")


  // const [drawPack, setDrawPack] = useState([])




  // const addPack = (payload) => {
  //   setDrawPack((oldPack) =>  [...oldPack, payload])
  //   console.log(drawPack)
  // }
  function throttled(delay, fn) {
  let lastCall = 0;
  return function (...args) {
    const now = (new Date).getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  }
}










  useEffect(() => {
    let canv = canvasRef.current;
    canv.width = parentRef.current.offsetWidth;
    canv.height = parentRef.current.offsetHeight;

    let canvCtx = canv.getContext("2d");
    canvCtx.lineJoin = "round";
    canvCtx.lineCap = "round";

    setCtx(canvCtx);

    let offset = canv.getBoundingClientRect();
    setCanvasOffset({ x: parseInt(offset.left), y: parseInt(offset.top) });
  }, [ctx]);

  useEffect(() => {
    socket.on('takeClear', () => {
      ctx.clearRect(0,0,500,500)
    })
    socket.on('hidemouse', () => {
      setCursorstyle('none')
    })
    socket.on('hidemouseclear', () => {
      setCursorstyle('default')
    })
    return () => {
      socket.off('takeClear')
      socket.off('hidemouse')
      socket.off('hidemouseclear')
    }
  })

  function handleMouseDown(e) {
    setDrawing(true);
    setPosition({
      x: parseInt(e.clientX - canvasOffset.x),
      y: parseInt(e.clientY - canvasOffset.y),
    });
    ctx.fillStyle = color

    ctx.beginPath()
    ctx.arc(position.x, position.y, thickness/2, 0, 2*Math.PI)
    ctx.fill()
    ctx.closePath()
    let payload = {
      centerx: position.x,
      centery: position.y,
      color: color,
      thickness: thickness

    }
    socket.emit('sendDot', {payload:payload})
  }
  function handleMouseUp() {
    setDrawing(false);
  }
  function handleMouseOut() {
    setDrawing(false);
  }

  const handleMouseMove = (e) => {
    let mousex = e.clientX - canvasOffset.x;
    let mousey = e.clientY - canvasOffset.y;
    if (drawing) {
      ctx.strokeStyle = color;
      ctx.lineWidth = thickness;
      ctx.beginPath();
      ctx.moveTo(position.x, position.y);
      ctx.lineTo(mousex, mousey);
      ctx.stroke();
      var payload = {
        oldx: position.x,
        oldy: position.y,
        newx: mousex,
        newy: mousey,
        color: color,
        thickness: thickness
      }

      socket.emit('sendPack', {payload:payload})

    }
    setPosition({ x: mousex, y: mousey });
  }

  const throttledhandleMouseMove = throttled(50, handleMouseMove)

  function handleColor(color) {
    setColor(color);
  }
  const handleSize = (size) => {
    setThickness(size)
  }
  const handleTaker = () => {

    setActiveTake(!activeTake)
    console.log(activeTake)
  }

  return (



    <div className={classes.boardContainer} ref={parentRef}>





      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={throttledhandleMouseMove}
        onMouseOut={handleMouseOut}
        height="500" width="500"


        style={{border:"1px solid", cursor: cursorstyle }}

      />
      <div className={classes.controlContainer}>
        <Controls handleColor={handleColor} handleSize={handleSize} activeTake={activeTake}/>

      </div>

    </div>

  );

}

export default Canvas;
