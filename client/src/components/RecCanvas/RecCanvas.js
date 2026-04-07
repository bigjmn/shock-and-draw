import React, { useState, useEffect } from "react";
import PeepCanvas from "../PeepCanvas/PeepCanvas";
import FadeControl from '../FadeControl/FadeControl.js'
import socket from '../../context/socket.js'
import classes from './RecCanvas.module.css'

const RecCanvas = ({word}) => {
  const canvasRef = React.useRef(null);
  const parentRef = React.useRef(null);
  const [ctx, setCtx] = useState({});
  const [peepingtom, setPeepingtom] = useState(false)
  const [fading, setFading] = useState(false)
  const [frozen, setFrozen] = useState(false)

  const handlePack = (payload) => {
    ctx.strokeStyle = payload.color
    ctx.lineWidth = payload.thickness
    ctx.beginPath()
    ctx.moveTo(payload.oldx, payload.oldy)
    ctx.lineTo(payload.newx, payload.newy)
    ctx.stroke()
  }

  const handleDot = (payload) => {
    ctx.fillStyle = payload.color
    ctx.beginPath()
    ctx.arc(payload.centerx, payload.centery, payload.thickness / 2, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
  }

  const fadeCanvas = () => {
    if (frozen) return
    ctx.fillStyle = "rgb(255,255,255,0.03)"
    ctx.fillRect(0, 0, 500, 500)
  }

  const correctSign = () => {
    ctx.fillStyle = '#0d1117'
    ctx.fillRect(90, 90, 320, 220)
    ctx.fillStyle = '#161b22'
    ctx.fillRect(96, 96, 308, 208)
    ctx.fillStyle = '#3fb950'
    ctx.font = 'bold 38px "Bebas Neue", sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('correct!', 250, 160)
    ctx.fillStyle = '#e6edf3'
    ctx.font = 'bold 32px "Bebas Neue", sans-serif'
    ctx.fillText(word + ' ✔', 250, 260)
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
  }

  useEffect(() => {
    socket.on('takePacket', (data) => { handlePack(data.payload) })
    socket.on('takeDot', (data) => { handleDot(data.payload) })
    socket.on('takeClear', () => { ctx.clearRect(0, 0, 500, 500); setFrozen(false) })
    socket.on('peepingtom', () => { setPeepingtom(true) })
    socket.on('peepingtomclear', () => { setPeepingtom(false) })
    socket.on('canfade', () => { setFading(true) })
    socket.on('canfadeclear', () => { setFading(false) })
    socket.on('correct', () => { correctSign(); setFrozen(true) })
    socket.on('passmessage', () => { passSign(); setFrozen(true) })
    return () => {
      socket.off('takePacket')
      socket.off('takeDot')
      socket.off('takeClear')
      socket.off('peepingtom')
      socket.off('peepingtomclear')
      socket.off('canfade')
      socket.off('canfadeclear')
      socket.off('correct')
      socket.off('passmessage')
    }
  })

  useEffect(() => {
    let canv = canvasRef.current;
    canv.width = parentRef.current.offsetWidth;
    canv.height = parentRef.current.offsetHeight;
    let canvCtx = canv.getContext("2d");
    canvCtx.lineJoin = "round";
    canvCtx.lineCap = "round";
    canvCtx.lineWidth = 5;
    setCtx(canvCtx);
  }, [ctx]);

  return (
    <div ref={parentRef} className={classes.boardContainer}>
      <canvas
        className={classes.canvasEl}
        ref={canvasRef}
        style={{ height: '500px', width: '500px' }}
      />
      <div className={classes.peepContainer}>
        {peepingtom && <PeepCanvas />}
      </div>
      {fading && <FadeControl fadeCanvas={fadeCanvas} />}
    </div>
  );
}

export default RecCanvas;
