import React, { useState, useEffect } from "react";
import PeepCanvas from "../PeepCanvas/PeepCanvas";
import socket from '../../context/socket.js'
import classes from './RecCanvas.module.css'

const RecCanvas = ({word}) => {
  const canvasRef = React.useRef(null);
  const parentRef = React.useRef(null);
  const [ctx, setCtx] = useState({});
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("#000000");

  const [peepingtom, setPeepingtom] = useState(false)



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
    ctx.arc(payload.centerx, payload.centery, payload.thickness/2, 0, 2*Math.PI)
    ctx.fill()
    ctx.closePath()
  }
  const correctSign = () => {
    ctx.fillStyle = 'black'
    ctx.fillRect(90, 90, 320, 220)
    ctx.fillStyle = 'white'
    ctx.fillRect(100,100,300,200)
    ctx.fillStyle = 'black'
    ctx.font = 'bold 42px serif'
    ctx.textAlign = 'center'
    ctx.fillText('correct!', 250, 140)
    ctx.fillStyle = 'green'
    ctx.font = 'bold 42px serif'
    ctx.fillText(word+' ✔', 250, 260)
  }
  useEffect(() => {
    socket.on('takePacket', (data) => {

      handlePack(data.payload)
    })
    socket.on('takeDot', (data) => {
      handleDot(data.payload)
    })
    socket.on('takeClear', () => {
      ctx.clearRect(0,0,500,500)
    })
    socket.on('peepingtom', () => {
      setPeepingtom(true)
    })
    socket.on('peepingtomclear', () => {
      setPeepingtom(false)
    })
    socket.on('correct', () => {
      correctSign()
    })
    return () => {
      socket.off('takePacket')
      socket.off('takeDot')
      socket.off('takeClear')
      socket.off('peepingtom')
      socket.off('peepingtomclear')
      socket.off('correct')
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

    let offset = canv.getBoundingClientRect();
    setCanvasOffset({ x: parseInt(offset.left), y: parseInt(offset.top) });
  }, [ctx]);





  return (
    <div>




    <div className={classes.boardContainer} ref={parentRef}>



      <canvas
        ref={canvasRef}


        height="500" width="500"


        style={{border:"1px solid"}}

      />



    </div>
    <div className={classes.peepContainer}>
      {peepingtom && <PeepCanvas />}
    </div>

    </div>

  );

}

export default RecCanvas;
