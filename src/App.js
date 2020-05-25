import React, {useState} from 'react';
import './App.css';
import * as Tone from 'tone';

import fetchData from './data/fetchData';

const playTone = midiPitch => {
  var synth = new Tone.Synth().toMaster();
  synth.triggerAttackRelease(Tone.Frequency(midiPitch, 'midi'), '8n');
}

const App = () => {
  const defaultPitch = 60;
  const [data, setData] = useState([]);
  const [pitch, setPitch] = useState(defaultPitch);
  const amount = 5;
  let key = 0;
  
  React.useEffect(() => {setData(fetchData(amount))}, []);

  return (
    <div>
      <h1>test</h1>

      {/* covid19 data stuff */}
      {/* <ul>
        {data.map(row => {
          let rowString = '';
          for (let value in row) {
            rowString += value;
          }
          return <li key={key++} >{rowString}</li>
        })}
      </ul> */}

      { /* tone js stuff */}
      <p>The current MIDI pitch is {pitch}</p>
      <button onClick={() =>playTone(pitch)}>play</button>
      <br />
      <button onClick={() =>setPitch(pitch + 1)}>Increase pitch</button>
      <button onClick={() =>setPitch(pitch - 1)}>Decrease pitch</button>
    </div>
  )
}

export default App;