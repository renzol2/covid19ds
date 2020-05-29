import React, {useState} from 'react';
import './App.css';
import * as Tone from 'tone';

// Functions
import FetchOwidData from './data/fetchData';
import mapData from './util/mapData';

// Components
import RegionForm from './data/regionForm';

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
  const amount = 10;
  let key = 0;

  // Data state variables
  const [{ data, regions, isLoading, isError }, fetchData] = 
    FetchOwidData(url, amount);
  const [region, setRegion] = useState('');

  // Sonification state variables
  const [pitch, setPitch] = useState(defaultPitch);
  const [oscSelection, setOscSelection] = useState(defaultOscSelection);
  const [minMidiPitch, setMinMidiPitch] = useState(0);
  const [maxMidiPitch, setMaxMidiPitch] = useState(127);

  // Callback function for getting selected region from region form
  let getRegion = (selectedRegion) => {
    setRegion(selectedRegion);
  };

  let handleMinMidiChange = event => {
    setMinMidiPitch(event.target.value);
  }

  let handleMaxMidiChange = event => {
    setMaxMidiPitch(event.target.value);
  }

  return (
    <div className='body'>
      <h1>COVID-19 Data Sonification</h1>

      {/* covid19 data stuff */}
      <h3>Display data:</h3>
      <p>{isLoading ? 'Loading data...' : null}</p>
      <p>{isError ? 'An error occurred.' : null}</p>
      
      <RegionForm regions={regions} callback={getRegion} /> 

      <ul>
        {
          data.map(line => (
            <li key={key++} >
              {line['date']}: <strong>{line[region]}</strong> cases (pitch: {})
            </li>
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
      <br />
      
      <p>Min/max MIDI pitch: [{minMidiPitch}, {maxMidiPitch}]</p>
      <label>
        Set minimum MIDI pitch:
        <input type='text' value={minMidiPitch} onChange={handleMinMidiChange}></input>
      </label>
      <br />
      <label>
        Set maximum MIDI pitch:
        <input type='text' value={maxMidiPitch} onChange={handleMaxMidiChange}></input>
      </label>

    </div>
  )
}

export default App;