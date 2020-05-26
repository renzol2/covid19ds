import React, {useState} from 'react';
import './App.css';
import * as Tone from 'tone';

import fetchData from './data/fetchData';

const playTone = (midiPitch, oscType) => {
  const options = {oscillator: {
    type: oscType,
  }};
  var synth = new Tone.Synth(options).toMaster();
  synth.triggerAttackRelease(Tone.Frequency(midiPitch, 'midi'), '8n');
}

const App = () => {
  const defaultPitch = 60;
  const defaultOscSelection = 1;
  const oscTypes = [
    'sine',
    'triangle',
    'square',
    'sawtooth',
  ];

  const [data, setData] = useState([]);
  const [pitch, setPitch] = useState(defaultPitch);
  const [oscSelection, setOscSelection] = useState(defaultOscSelection);

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
      <p>The current MIDI pitch is: {pitch}</p>
      <p>The current oscillator is: {oscTypes[oscSelection]}</p>
      <button onClick={() =>playTone(pitch, oscTypes[oscSelection])}>play</button>
      <br />
      <button onClick={() => setPitch(pitch + 1)}>Increase pitch</button>
      <button onClick={() => setPitch(pitch - 1)}>Decrease pitch</button>
      <br />
      <button onClick={
          () => setOscSelection((oscSelection + 1) % oscTypes.length)
        }>
          Toggle oscillator
      </button>
    </div>
  )
}

export default App;