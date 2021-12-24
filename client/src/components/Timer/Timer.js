import {useEffect, useState } from 'react'
const Timer = ({maxTime, startTime, secSetter}) => {








  useEffect(() => {
    let int = null
    if (startTime == 0){
      return
    }
    int = setInterval(() => {

      secSetter(maxTime-(Math.round((Date.now() - startTime)/1000)))

    }, 1000)
    return function cleanup(){
      console.log('clearing')
      clearInterval(int)

    }

  }, [startTime])

  return (
    <div>

    </div>
  )

}

export default Timer
