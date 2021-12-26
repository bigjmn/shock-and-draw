import React, { useState, useEffect } from "react";
import socket from '../../context/socket.js'
import sound from './correct.mp3'
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

const Player = () => {
  const [playing, toggle] = useAudio(sound);
  useEffect(() => {
    socket.on('correctsound', () => document.getElementById('clickplayer').click())
    return () => socket.off('correctsound')
  })

  return (
    <div style={{display:"none"}}>
      <button id='clickplayer' onClick={toggle}>{playing ? "Pause" : "Play"}</button>
    </div>
  );
};

export default Player;
