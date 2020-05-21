import React, {useState} from 'react';
import './App.css';
import * as Tone from 'tone';

const playTone = () => {
  const synth = new Tone.Synth().toMaster();
  synth.triggerAttackRelease('C4', '8n');
}

const App = () => {
  return (
    <div>
      hey. my name is renzo. i'm still learning so i don't have much here but i hope you have a great day!
      <br />
      <button onClick={() => {playTone()}}>
        play a c4
      </button>
    </div>
  )
}

export default App;