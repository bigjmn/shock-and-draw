import React, { useState, useEffect } from "react";



function PeepCanvas() {
  const canvasRef = React.useRef(null);
  const parentRef = React.useRef(null);
  const [ctx, setCtx] = useState({});
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [peeping, setPeeping] = useState(false);



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
    canvCtx.fillStyle = "black";


    setCtx(canvCtx);

    let offset = canv.getBoundingClientRect();
    setCanvasOffset({ x: parseInt(offset.left), y: parseInt(offset.top) });
    canvCtx.fillRect(0,0,500,500)

  }, [ctx]);



  function handleMouseDown(e) {
    setPeeping(true);
    let mousex = e.clientX - canvasOffset.x;
    let mousey = e.clientY - canvasOffset.y;
    ctx.clearRect(mousex-90,mousey-90,180,180)
  }
  function handleMouseUp() {
    setPeeping(false);
    ctx.fillRect(0,0,500,500)
  }
  function handleMouseOut() {
    setPeeping(false);
    ctx.fillRect(0,0,500,500)
  }

  const handleMouseMove = (e) => {
    let mousex = e.clientX - canvasOffset.x;
    let mousey = e.clientY - canvasOffset.y;
    if (peeping) {
      ctx.fillRect(0,0,500,500)
      ctx.clearRect(mousex-90,mousey-90,180,180)


    }

  }

  const throttledhandleMouseMove = throttled(50, handleMouseMove)



  return (



    <div className="PeepCanvas" ref={parentRef}>





      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
        onMouseMove={handleMouseMove}



        style={{border:"1px solid", height:'500px', width:'500px' }}

      />

    </div>

  );

}

export default PeepCanvas;
