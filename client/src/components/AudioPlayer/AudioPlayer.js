import React, { useState, useEffect } from "react";
import socket from '../../context/socket.js'
import sound from './correct.mp3'
import badsound from './negative_beep.wav'
import zapsound from './zap.mp3'
import rendersound from './settingpiece.mp3'
const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Player = ({onmute}) => {
  const [playing, toggle] = useAudio(sound);
  const [badplaying, badtoggle] = useAudio(badsound)
  const [zapplaying, zaptoggle] = useAudio(zapsound)
  const [renderplaying, rendertoggle] = useAudio(rendersound)


  const findandplay = (buttonid) => {
    if (onmute){
      return
    }
    document.getElementById(buttonid).click()
  }
  useEffect(() => {
    socket.on('correctsound', () => findandplay('clickplayer'))
    socket.on('passnoise', () => findandplay('passplayer'))
    socket.on('zapnoise', () => findandplay('zapplayer'))
    socket.on('rendersound', () => findandplay('renderplayer'))

    return () => {
      socket.off('correctsound')
      socket.off('passnoise')
      socket.off('zapnoise')
      socket.off('rendersound')
    }
  })

  return (
    <div>



    <div style={{display:"none"}}>
      <button id='clickplayer' onClick={toggle}>{playing ? "Pause" : "Play"}</button>
      <button id='passplayer' onClick={badtoggle}>{badplaying ? "Pause" : "Play"}</button>
      <button id='zapplayer' onClick={zaptoggle}>{zapplaying ? "Pause" : "Play"}</button>
      <button id='renderplayer' onClick={rendertoggle}>{renderplaying ? "Pause" : "Play"}</button>


    </div>
    </div>
  );
};

export default Player;
export {useAudio};
