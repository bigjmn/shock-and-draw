import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import Player from './components/AudioPlayer/AudioPlayer.js'
import Room from './layouts/Room/Room.js'

function App() {
  const [onmute, setOnmute] = useState(false)
  return (
    <div className="App">
      <Room setOnmute={setOnmute} onmute={onmute}/>
      <Player onmute={onmute}/>

    </div>
  );
}

export default App;
