import React, {useState} from 'react';
import './App.css';
import * as Tone from 'tone';

import FetchOwidData from './data/fetchData';

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
  const url = 'https://covid.ourworldindata.org/data/ecdc/total_cases.csv';
  const amount = 5;
  let key = 0;

  const [{ data, isLoading, isError }, fetchData] = 
    FetchOwidData(url, amount);
  const [pitch, setPitch] = useState(defaultPitch);
  const [oscSelection, setOscSelection] = useState(defaultOscSelection);

  return (
    <div>
      <h1>COVID-19 Data Sonification</h1>

      {/* covid19 data stuff */}
      <h3>Display data:</h3>
      <p>{isLoading ? 'Loading data...' : null}</p>
      <p>{isError ? 'An error occurred.' : null}</p>

      <ul>
        {
          data.map(line => (
            <li key={key++} >{line[0]}</li>
          ))
        }
      </ul>
      

      { /* tone js stuff */}
      <h3>Options:</h3>
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