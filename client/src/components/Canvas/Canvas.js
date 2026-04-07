import React, { useState, useEffect } from "react";
import Controls from "../Controls/Controls";
import FadeControl from "../FadeControl/FadeControl.js"
import socket from '../../context/socket.js'
import classes from './Canvas.module.css'

const Canvas = ({word}) => {
  const canvasRef = React.useRef(null);
  const parentRef = React.useRef(null);
  const [ctx, setCtx] = useState({});
  const [drawing, setDrawing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("#000000");
  const [thickness, setThickness] = useState(5)
  const [cursorstyle, setCursorstyle] = useState("crosshair")
  const [frozen, setFrozen] = useState(false)
  const [fading, setFading] = useState(false)

  function throttled(delay, fn) {
    let lastCall = 0;
    return function (...args) {
      const now = (new Date).getTime();
      if (now - lastCall < delay) return;
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
  }, [ctx]);

  const correctSign = () => {
    ctx.fillStyle = '#0d1117'
    ctx.fillRect(90, 90, 320, 220)
    ctx.fillStyle = '#161b22'
    ctx.fillRect(96, 96, 308, 208)
    ctx.fillStyle = '#3fb950'
    ctx.font = 'bold 38px "Bebas Neue", sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('CORRECT!', 250, 160)
    ctx.fillStyle = '#e6edf3'
    ctx.font = 'bold 32px "Bebas Neue", sans-serif'
    ctx.fillText(word + ' ✔', 250, 260)
    setTimeout(() => {
      setFrozen(false)
      socket.emit('getNext')
    }, 1500)
  }

  const passSign = () => {
    ctx.fillStyle = '#0d1117'
    ctx.fillRect(90, 90, 320, 220)
    ctx.fillStyle = '#161b22'
    ctx.fillRect(96, 96, 308, 208)
    ctx.fillStyle = '#ff3b2d'
    ctx.font = 'bold 38px "Bebas Neue", sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('PASS', 250, 160)
    ctx.fillStyle = '#7d8590'
    ctx.font = 'bold 32px "Bebas Neue", sans-serif'
    ctx.fillText(word + ' ❌', 250, 260)
    setTimeout(() => {
      setFrozen(false)
      socket.emit('getNext')
      socket.emit('hitme')
    }, 1500)
  }

  useEffect(() => {
    socket.on('takeClear', () => { ctx.clearRect(0, 0, 500, 500) })
    socket.on('hidemouse', () => { setCursorstyle('none') })
    socket.on('hidemouseclear', () => { setCursorstyle('crosshair') })
    socket.on('canfade', () => { setFading(true) })
    socket.on('canfadeclear', () => { setFading(false) })
    socket.on('correct', () => { setDrawing(false); setFrozen(true); correctSign() })
    socket.on('passmessage', () => { setDrawing(false); setFrozen(true); passSign() })
    return () => {
      socket.off('takeClear')
      socket.off('hidemouse')
      socket.off('hidemouseclear')
      socket.off('correct')
      socket.off('passmessage')
    }
  })

  function handleMouseDown(e) {
    if (frozen) return
    setDrawing(true);
    setPosition({ x: parseInt(e.nativeEvent.offsetX), y: parseInt(e.nativeEvent.offsetY) });
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(position.x, position.y, thickness / 2, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
    socket.emit('sendDot', { payload: { centerx: position.x, centery: position.y, color, thickness } })
  }

  function handleMouseUp() { setDrawing(false) }
  function handleMouseOut() { setDrawing(false) }

  const fadeCanvas = () => {
    if (frozen) return
    ctx.fillStyle = "rgb(255,255,255,0.03)"
    ctx.fillRect(0, 0, 500, 500)
  }

  const handleMouseMove = (e) => {
    const mousex = e.nativeEvent.offsetX;
    const mousey = e.nativeEvent.offsetY;
    if (drawing) {
      ctx.strokeStyle = color;
      ctx.lineWidth = thickness;
      ctx.beginPath();
      ctx.moveTo(position.x, position.y);
      ctx.lineTo(mousex, mousey);
      ctx.stroke();
      socket.emit('sendPack', { payload: { oldx: position.x, oldy: position.y, newx: mousex, newy: mousey, color, thickness } })
    }
    setPosition({ x: mousex, y: mousey });
  }

  const throttledhandleMouseMove = throttled(50, handleMouseMove)

  return (
    <div className={classes.boardContainer} ref={parentRef}>
      <canvas
        className={classes.canvasEl}
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={throttledhandleMouseMove}
        onMouseOut={handleMouseOut}
        style={{ height: '500px', width: '500px', cursor: cursorstyle }}
      />
      <div className={classes.controlContainer}>
        <Controls handleColor={(c) => setColor(c)} handleSize={(s) => setThickness(s)} />
      </div>
      {fading && <FadeControl fadeCanvas={fadeCanvas} />}
    </div>
  );
}

export default Canvas;
