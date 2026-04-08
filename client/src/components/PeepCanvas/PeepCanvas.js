import React, { useState, useEffect, useRef } from "react";
import classes from './PeepCanvas.module.css'

const CANVAS_SIZE = 500
const HOLE_SIZE = 180

function PeepCanvas() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState({});
  const [peeping, setPeeping] = useState(false);

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
    canv.width = CANVAS_SIZE;
    canv.height = CANVAS_SIZE;
    let canvCtx = canv.getContext("2d");
    canvCtx.fillStyle = "black";
    canvCtx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    setCtx(canvCtx);
  }, [ctx]);

  // Converts display-pixel coords → canvas-internal coords
  const getPos = (clientX, clientY) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const scale = CANVAS_SIZE / rect.width
    return {
      x: Math.round((clientX - rect.left) * scale),
      y: Math.round((clientY - rect.top) * scale)
    }
  }

  const peepAt = (x, y) => {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    ctx.clearRect(x - HOLE_SIZE / 2, y - HOLE_SIZE / 2, HOLE_SIZE, HOLE_SIZE)
  }

  function handleMouseDown(e) {
    setPeeping(true);
    const { x, y } = getPos(e.clientX, e.clientY)
    peepAt(x, y)
  }
  function handleMouseUp() {
    setPeeping(false);
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  }
  function handleMouseOut() {
    setPeeping(false);
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  }
  const handleMouseMove = (e) => {
    if (!peeping) return
    const { x, y } = getPos(e.clientX, e.clientY)
    peepAt(x, y)
  }

  function handleTouchStart(e) {
    setPeeping(true)
    const touch = e.touches[0]
    const { x, y } = getPos(touch.clientX, touch.clientY)
    peepAt(x, y)
  }
  const handleTouchMove = (e) => {
    if (!peeping) return
    const touch = e.touches[0]
    const { x, y } = getPos(touch.clientX, touch.clientY)
    peepAt(x, y)
  }
  function handleTouchEnd() {
    setPeeping(false)
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  }

  const throttledMouseMove = throttled(30, handleMouseMove)
  const throttledTouchMove = throttled(30, handleTouchMove)

  return (
    <div className={classes.boardContainer}>
      <canvas
        className={classes.canvasEl}
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
        onMouseMove={throttledMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={throttledTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      />
    </div>
  );
}

export default PeepCanvas;
