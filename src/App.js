import React, {useState} from 'react';
import './App.css';
import * as Tone from 'tone';

import fetchData from './data/fetchData';

const playTone = midiPitch => {
  var synth = new Tone.Synth().toMaster();
  synth.triggerAttackRelease(Tone.Frequency(midiPitch, 'midi'), '8n');
}

const App = () => {
  const [data, setData] = useState([]);
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
      <button onClick={() =>playTone(60)}>play</button>
    </div>
  )
}

export default App;