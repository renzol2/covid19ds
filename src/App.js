import React, {useState, useRef, useEffect} from 'react';
import './App.css';

// Tone.js imports
import * as Tone from 'tone';

// React-Bootstrap imports
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// Function imports
import FetchOwidData from './data/fetchData';
import getMinMax from './util/getMinMax';
import mapData from './util/mapData';

// Components
import RegionDropdown from './components/regionDropdown';
import DataGraph from './components/dataGraph';
import BpmInput from './components/bpmInput';
import OscillatorToggleButton from './components/toggleOscButton';
import PitchButtonGroup from './components/pitchChange';
import MinMaxMidiInput from './components/minMaxMidiInput';

// Default pitch
const defaultPitch = 60;

// Default BPM
const defaultBpm = 999;

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

function App() {
  // Data state variables
  const [
    { data, regions, isLoading, isError }, 
    // fetchData  // commenting out to stop lint errors
  ] = FetchOwidData(url);

  const [region, setRegion] = useState('');
  const [regionData, setRegionData] = useState([]);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [visualize, setVisualize] = useState(true);
  const [animation, setAnimation] = useState(false);
  const [currentAmt, setCurrentAmt] = useState(-1);
  const [currentDate, setCurrentDate] = useState('');

  // Sonification state variables
  const [pitch, setPitch] = useState(defaultPitch);
  const [oscSelection, setOscSelection] = useState(defaultOscSelection);
  const [minMidiPitch, setMinMidiPitch] = useState(defaultMinMidi);
  const [maxMidiPitch, setMaxMidiPitch] = useState(defaultMaxMidi);
  const [bpm, setBpm] = useState(defaultBpm);

  // Synth (with initialization)
  const synth = useRef(null);
  useEffect(() => {
    // Set oscillator type and initialize synth
    const options = {oscillator: {
      type: oscTypes[oscSelection],
    }};
    synth.current = new Tone.Synth(options).toMaster();
  });

  /**
   * Updates state variables with region from dropdown
   * @param {string} selectedRegion region from dropdown component
   */
  function initializeRegion(selectedRegion) {
    setRegion(selectedRegion);
    initializeRegionData(selectedRegion);
  };

  /**
   * Sets region data and min/max pitches using region data
   * @param {string} newRegion selected region from dropdown
   */
  function initializeRegionData(newRegion) {
    let selectedRegionData = [];
    let amounts = [];

    // Populate region data and amounts
    let key = 0;
    for (var line of data) {
      selectedRegionData.push(
        { 
          date: line['date'], 
          amount: parseInt(line[newRegion]),
          index: key++
        }
      );
      
      amounts.push(parseInt(line[newRegion])); 
    }

    selectedRegionData.filter(entry => !isNaN(entry.amount));
    setRegionData(selectedRegionData);
    
    let minMax = getMinMax(amounts.filter(
      amount => !isNaN(amount)
    ));

    setMinAmount(minMax.min);
    setMaxAmount(minMax.max);
  };

  /**
   * Maps a point of data to a MIDI note using min/max amounts kept in state
   * @param {number} amount data to map
   * @returns {number} MIDI note
   */
  function convertEntryToMidi(amount) {
    let mapped = mapData(minAmount, maxAmount, minMidiPitch, maxMidiPitch, amount);
    let midi = Math.floor(mapped);
    return midi;
  }

  /**
   * Sonifies data of selected region
   */
  function sonifyData() {
    Tone.Transport.cancel();  // stops previous loop

    // Map region data to objects { note, index }
    const notes = regionData.map(entry => ({
      note: convertEntryToMidi(entry.amount),
      date: entry.date,
      index: entry.index,
    })).filter(entry => !isNaN(entry.note));
    
    // Set up pattern to play data
    var pattern = new Tone.Pattern((time, entry) => {
      synth.current.triggerAttackRelease(Tone.Frequency(entry.note, 'midi'), 0.25);
      
      setCurrentAmt(regionData[entry.index].amount);
      setCurrentDate(entry.date);

      // Stop playback when finished
      if (pattern.index === pattern.values.length - 1) {
        Tone.Transport.cancel();
      }
    }, notes);
    
    pattern.start(0);
    Tone.Transport.bpm.value = bpm;

    Tone.Transport.start();
  }

  /**
   * Sanitizes region data for visualiation in react-vis
   * @param {Array} regionData region data containing objects { date, amount, index }
   * @returns {Array} an array of objects { x, y, color }
   */
  function sanitizeData(regionData) {
    const data = regionData.filter(entry => !isNaN(entry.amount)).map(
      entry => ({
        x: entry.index,
        y: entry.amount,
        color: entry.amount === currentAmt ? 0 : 1,
      })
    );
    
    return data;
  }

  /**
   * Plays the given MIDI note using the synth and its current settings
   * @param {number} midiNote 
   */
  function playMidiNote(midiNote) {
    synth.current.triggerAttackRelease(Tone.Frequency(midiNote, 'midi'), '8n');
  }  

  /**
   * Handles numerical input for visualization/sonification parameters (state)
   * Insures only numerical inputs are processed
   * 
   * @param {Object} event event from React-Bootstrap form input 
   * @param {Function} setStateFunction function to set state with new event value
   */
  function handleInput(event, setStateFunction) {
    let newValue = parseInt(event.target.value);
    if (isNaN(newValue)) {
      return;
    }
    setStateFunction(newValue);
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
      <p>Current amount: {currentAmt === -1 ? 'None' : `${currentAmt} cases at ${currentDate}`}</p>

      <h4>Current region: {region}</h4>
      

      <ButtonGroup>
        <RegionDropdown regions={regions} callback={initializeRegion} />
        <Button onClick={() => setVisualize(!visualize)}>Toggle visualization</Button>
        <Button onClick={() => setAnimation(!animation)}>Toggle animation (affects performance)</Button>
      </ButtonGroup>
      <br />

      {/* Play/stop buttons when region data is selected */}
      {
        regionData.length === 0 
          ? null 
          : (
              <ButtonGroup>
                <Button variant='success' onClick={() => sonifyData(oscTypes[oscSelection])}>
                  Play
                </Button>
                <Button variant='danger' onClick={() => Tone.Transport.cancel()}>
                  Stop
                </Button>
              </ButtonGroup>
            )
      }

      {/* Data visualization */}
      <DataGraph
        visualize={visualize}
        height={400}
        animation={animation}
        colorRange={['yellow', 'cornflowerblue']}
        gridLineColor={'#B7E9ED'}
        data={sanitizeData(regionData)}
        onMouseLeave={() => setCurrentAmt(-1)}
        onNearestX={(entry, {index}) => {
          setCurrentAmt(entry.y);
          setCurrentDate(regionData[index].date);
        }}
        onValueClick={entry => {
          playMidiNote(convertEntryToMidi(entry.y));
        }}
        xAxisTitle={'Days since December 31, 2019'}
        yAxisTitle={'Total amount of cases'}
        yAxisLeft={50}
      />

      { /* tone js stuff */}
      <h3>Options:</h3>
      
      <Button variant="info" onClick={() => playMidiNote(pitch)}>Play test pitch</Button>
      <br />
      <br />
      
      <PitchButtonGroup setPitch={setPitch} pitch={pitch} />
      <p>The current MIDI pitch is: <strong>{pitch}</strong></p>
      
      <OscillatorToggleButton 
        setOscSelection={setOscSelection}
        oscSelection={oscSelection}
        oscTypes={oscTypes}
      />
      <p>The current oscillator is: <strong>{oscTypes[oscSelection]}</strong></p>
      <br />

      <MinMaxMidiInput
        handleInput={handleInput}
        setMinMidiPitch={setMinMidiPitch}
        setMaxMidiPitch={setMaxMidiPitch}
      />
      <p>
        Min/max MIDI pitch: <strong>[{minMidiPitch}, {maxMidiPitch}]</strong>
      </p>

      {/* BPM input */}
      <BpmInput bpm={bpm} setBpm={setBpm} handleInput={handleInput} />
      
      {/* Data (actual / MIDI) */}
      {regionData.length !== 0 && (<h2>Raw data</h2>)}
      <ul>
        {regionData.length !== 0 &&
          regionData.map(entry => (
            <li key={key++} >
              {entry.date}: <strong>{
                isNaN(entry.amount) 
                  ? 'No data' 
                  : entry.amount
              }</strong> 
            </li>
          ))
        }
      </ul>

    </div>
  )
}

export default App;