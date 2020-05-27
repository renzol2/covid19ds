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

  const [{ data, isLoading, isError }, fetchData] = 
    FetchOwidData(url, amount);
  const [pitch, setPitch] = useState(defaultPitch);
  const [oscSelection, setOscSelection] = useState(defaultOscSelection);

  
  
  // React.useEffect(() => {
  //   const fetchedData = fetchOwidData(amount);
  //   console.log(fetchedData);
  //   setData(fetchedData);
  // }, []);

  return (
    <div>
      <h1>test</h1>

      {/* covid19 data stuff */}
      <h1>
        {data !== undefined ? data.length : null}
      </h1>
      <h2>
        {isLoading ? 'loading' : null}
        {isError ? 'error' : null}
      </h2>

      <button onClick={() => fetchData(url)}>fetch</button>

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