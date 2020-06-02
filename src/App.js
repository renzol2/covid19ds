import React, {useState} from 'react';
import './App.css';
import * as Tone from 'tone';

// React-Bootstrap imports
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

// Function imports
import FetchOwidData from './data/fetchData';
import getMinMax from './util/getMinMax';
import mapData from './util/mapData';

// Components
import RegionForm from './components/regionForm';
import RegionDropdown from './components/regionDropdown';

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
  const amount = 75;
  let key = 0;

  // Data state variables
  const [{ data, regions, isLoading, isError }, fetchData] = 
    FetchOwidData(url, amount);
  const [region, setRegion] = useState('');
  const [regionData, setRegionData] = useState([]);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);

  // Sonification state variables
  const [pitch, setPitch] = useState(defaultPitch);
  const [oscSelection, setOscSelection] = useState(defaultOscSelection);
  const [minMidiPitch, setMinMidiPitch] = useState(0);
  const [maxMidiPitch, setMaxMidiPitch] = useState(127);

  // Callback functions for getting selected region from region form
  let initializeRegion = (selectedRegion) => {
    setRegion(selectedRegion);
    initializeRegionData(selectedRegion);
  };

  let initializeRegionData = newRegion => {
    let selectedRegionData = [];
    let amounts = [];
    for (var line of data) {
      selectedRegionData.push(
        { 
          date: line['date'], 
          amount: parseInt(line[newRegion]) 
        }
      );
      
      amounts.push(parseInt(line[newRegion])); 
    }

    setRegionData(selectedRegionData);
    
    let minMax = getMinMax(amounts);
    setMinAmount(minMax.min);
    setMaxAmount(minMax.max);
  };  

  // Handler functions of text inputs for min/max MIDI pitch
  let handleMinMidiChange = event => {
    let newMin = parseInt(event.target.value);
    if (isNaN(newMin)) {
      return;
    }
    setMinMidiPitch(newMin);
  }

  let handleMaxMidiChange = event => {
    let newMax = parseInt(event.target.value);
    if (isNaN(newMax)) {
      return;
    }
    setMaxMidiPitch(newMax);
  }

  return (
    <div className='body'>
      <h1>COVID-19 Data Sonification</h1>
      {/* covid19 data stuff */}
      <h3>Display data:</h3>
      <p>{isLoading ? 'Loading data...' : null}</p>
      <p>{isError ? 'An error occurred.' : null}</p>
      
      <p>Min/max amount: {minAmount}/{maxAmount}</p>

      <h4>Current region (App): {region}</h4>
      <RegionDropdown regions={regions} callback={initializeRegion} />
      {/* <RegionForm regions={regions} callback={initializeRegion} />  */}
      
      <ul>
        {
          regionData.map(dateAmount => (
            <li key={key++} >
              {dateAmount.date}: <strong>{isNaN(dateAmount.amount) ? 'No data' : dateAmount.amount}</strong> 
              (MIDI: {isNaN(dateAmount.amount) ? '' : Math.floor(mapData(
                  minAmount, maxAmount, minMidiPitch, maxMidiPitch, dateAmount.amount
                ))})
            </li>
          ))
        }
      </ul>
      

      { /* tone js stuff */}
      <h3>Options:</h3>
      <p>The current MIDI pitch is: {pitch}</p>
      <p>The current oscillator is: {oscTypes[oscSelection]}</p>
      <Button onClick={() =>playTone(pitch, oscTypes[oscSelection])}>play</Button>
      <br />
      
      <ButtonGroup aria-label='Increase/decrease pitch'>
        <Button variant='secondary' onClick={() => setPitch(pitch + 1)}>Increase pitch</Button>
        <Button variant='secondary' onClick={() => setPitch(pitch - 1)}>Decrease pitch</Button>
      </ButtonGroup>
      <br />
      
      <Button variant='primary' onClick={
        () => setOscSelection((oscSelection + 1) % oscTypes.length)
      }>
        Toggle oscillator
      </Button>
      <br />

      <h5>Min/max MIDI pitch: [{minMidiPitch}, {maxMidiPitch}]</h5>

      {/* Min MIDI pitch input */}
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Minimum MIDI pitch</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl 
          placeholder='Ex: 0'
          aria-label='Minimum MIDI pitch'
          onChange={handleMinMidiChange}
        />
      </InputGroup>
      <br />

      {/* Max MIDI pitch input */}
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Maximum MIDI pitch</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder='Ex: 127'
          aria-label='Maximum MIDI pitch'
          onChange={handleMaxMidiChange}
        />
      </InputGroup>

    </div>
  )
}

export default App;