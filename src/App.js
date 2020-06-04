import React, {useState, useRef, useEffect} from 'react';
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
import RegionDropdown from './components/regionDropdown';

// Default pitch
const defaultPitch = 60;

// Default BPM
const defaultBpm = 200;

// Default MIDI parameters
const defaultMinMidi = 36;
const defaultMaxMidi = 96;

// Default oscillator selection
const defaultOscSelection = 1;

// All oscillator types
const oscTypes = [
  'sine',
  'triangle',
  'square',
  'sawtooth',
];

// URL to fetch data
const url = 'https://covid.ourworldindata.org/data/ecdc/total_cases.csv';

const App = () => {
  // Data state variables
  const [{ data, regions, isLoading, isError }, fetchData] = 
    FetchOwidData(url);
  const [region, setRegion] = useState('');
  const [regionData, setRegionData] = useState([]);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);

  // Sonification state variables
  const [pitch, setPitch] = useState(defaultPitch);
  const [oscSelection, setOscSelection] = useState(defaultOscSelection);
  const [minMidiPitch, setMinMidiPitch] = useState(defaultMinMidi);
  const [maxMidiPitch, setMaxMidiPitch] = useState(defaultMaxMidi);
  const [bpm, setBpm] = useState(defaultBpm);

  // Synth (with initialization)
  const synth = useRef(null);
  useEffect(() => {
    synth.current = new Tone.Synth().toMaster();
  });

  const playTest = (midiPitch, oscType) => {
    Tone.Transport.cancel();  // stops previous loop

    const options = {oscillator: {
      type: oscType,
    }};
  
    var synth = new Tone.Synth(options).toMaster();

    const notes = regionData.map(dateAmount => (
      isNaN(dateAmount.amount) ? null : Math.floor(mapData(
        minAmount, maxAmount, minMidiPitch, maxMidiPitch, dateAmount.amount
      ))
    )).filter(
      midiNote => midiNote !== null
    );
    
    var pattern = new Tone.Pattern((time, note) => {
      synth.triggerAttackRelease(Tone.Frequency(note, 'midi'), 0.25);
      if (pattern.progress === 1) {
        Tone.Transport.cancel();
      }
    }, notes);
    
    pattern.start(0);
    Tone.Transport.bpm.value = bpm;

    Tone.Transport.start();
    
  }

  // Callback functions for getting selected region from region form
  const initializeRegion = (selectedRegion) => {
    setRegion(selectedRegion);
    initializeRegionData(selectedRegion);
  };

  const initializeRegionData = newRegion => {
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
  const handleMinMidiChange = event => {
    let newMin = parseInt(event.target.value);
    if (isNaN(newMin)) {
      return;
    }
    setMinMidiPitch(newMin);
  }

  const handleMaxMidiChange = event => {
    let newMax = parseInt(event.target.value);
    if (isNaN(newMax)) {
      return;
    }
    setMaxMidiPitch(newMax);
  }

  const handleBpmChange = event => {
    let newBpm = parseInt(event.target.value);
    if (isNaN(newBpm)) {
      return;
    }
    setBpm(newBpm);
  }

  let key = 0;
  return (
    <div className='body'>
      <h1>COVID-19 Data Sonification</h1>
      {/* covid19 data stuff */}
      <h3>Display data:</h3>
      <p>{isLoading ? 'Loading data...' : null}</p>
      <p>{isError ? 'An error occurred.' : null}</p>
      
      <p>Min/max amount: {minAmount}/{maxAmount}</p>

      <h4>Current region: {region}</h4>
      <RegionDropdown regions={regions} callback={initializeRegion} />
      
      {
        regionData.length === 0 
          ? null 
          : (
              <div>
                <Button variant='success' onClick={playTest}>Play</Button>
                <Button variant='danger' onClick={() =>Tone.Transport.cancel()}>Stop</Button>
              </div>
             )
      }


      { /* tone js stuff */}
      <h3>Options:</h3>
      <p>The current MIDI pitch is: {pitch}</p>
      <p>The current oscillator is: {oscTypes[oscSelection]}</p>
      <Button onClick={() => playTest(pitch, oscTypes[oscSelection])}>Play test</Button>
      <br />
      
      <ButtonGroup aria-label='Increase/decrease pitch'>
        <Button variant='secondary' onClick={() => setPitch(pitch + 1)}>
          Increase pitch
        </Button>
        <Button variant='secondary' onClick={() => setPitch(pitch - 1)}>
          Decrease pitch
        </Button>
      </ButtonGroup>
      <br />
      
      <Button variant='primary' onClick={
        () => setOscSelection((oscSelection + 1) % oscTypes.length)
      }>
        Toggle oscillator
      </Button>
      <br />

      <h5>Min/max MIDI pitch: [{minMidiPitch}, {maxMidiPitch}]</h5>
      <h5>Current BPM: {bpm}</h5>

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

      {/* BPM input */}
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Playback BPM</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder='Ex: 200'
          aria-label='BPM'
          onChange={handleBpmChange}
        />
      </InputGroup>
      
      {/* Data (actual / MIDI) */}
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

    </div>
  )
}

export default App;