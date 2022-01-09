import React, { useState, useEffect } from "react";
import socket from '../../context/socket.js'
import sound from './correct.mp3'
import badsound from './negative_beep.wav'
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
  const [badplaying, badtoggle] = useAudio(badsound)
  useEffect(() => {
    socket.on('correctsound', () => document.getElementById('clickplayer').click())
    socket.on('passnoise', () => document.getElementById('passplayer').click())

    return () => {
      socket.off('correctsound')
      socket.off('passnoise')
    }
  })

  return (
    <div style={{display:"none"}}>
      <button id='clickplayer' onClick={toggle}>{playing ? "Pause" : "Play"}</button>
      <button id='passplayer' onClick={badtoggle}>{badplaying ? "Pause" : "Play"}</button>

    </div>
  );
};

export default Player;
